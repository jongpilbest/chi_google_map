// utils/rag.js
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const INDEX_NAME = process.env.PINECONE_INDEX || "test";

const UNKNOWN_PLACE_TOKEN = "x";
const MAX_CHILD_TEXT_LEN = 2000;
const MAX_PARENT_TEXT_LEN = 2000;
const MAX_CHILDREN_META = 128;
const BATCH = 128;

const EMBED_MODEL_NAME = "text-embedding-3-small";

// =========================
// OpenAI + Pinecone 초기화
// =========================
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const pc = new Pinecone({ apiKey: PINECONE_API_KEY });
const index = pc.Index(INDEX_NAME);

// =========================
// 임베딩 함수
// =========================
export async function embedBatch(texts) {
  const res = await openai.embeddings.create({
    model: EMBED_MODEL_NAME,
    input: texts,
  });
  return res.data.map((d) => d.embedding);
}

export async function embedQuery(q) {
  const res = await openai.embeddings.create({
    model: EMBED_MODEL_NAME,
    input: q,
  });
  return res.data[0].embedding;
}

function getMatches(res) {
  try {
    return res.matches || [];
  } catch {
    return [];
  }
}

// =========================
// Parent Only 검색
// =========================
export async function searchParentOnly(q, topK = 5) {
  const v = await embedQuery(q);
  const res = await index.query({
    vector: v,
    topK,
    includeMetadata: true,
    includeValues: false,
    filter: { type: { $eq: "parent" } },
  });

  const matches = getMatches(res);
  return matches.map((m) => {
    const md = m.metadata || {};
    return {
      parent_id: parseInt(md.parent_id ?? -1, 10),
      place: md.place || UNKNOWN_PLACE_TOKEN,
      time_window: md.time_window,
      text: md.text || "",
      score: m.score || 0,
    };
  });
}

// =========================
// Parent ID 기반 Fetch
// =========================
export async function fetchParentsByIds(pidList) {
  if (!pidList?.length) return {};

  const ids = pidList.map((pid) => `parent-${pid}`);
  const out = await index.fetch(ids);

  const vecs = out.vectors || {};
  const fetched = {};

  for (const [vid, payload] of Object.entries(vecs)) {
    const md = payload.metadata || {};
    let pid = md.parent_id;
    if (pid === undefined) {
      try {
        pid = parseInt(String(vid).split("-")[1], 10);
      } catch {
        continue;
      }
    }
    fetched[pid] = {
      place: md.place || UNKNOWN_PLACE_TOKEN,
      text: md.text || "",
      time_window: md.time_window,
    };
  }
  return fetched;
}

// =========================
// Hybrid 검색
// =========================
export async function searchHybrid(
  q,
  { topChild = 30, topParent = 10, preferPlace = true } = {}
) {
  const v = await embedQuery(q);

  // 1. child 검색
  const cres = await index.query({
    vector: v,
    topK: topChild,
    includeMetadata: true,
    includeValues: false,
    filter: { type: { $eq: "child" } },
  });

  const childMatches = getMatches(cres);

  // 2. parent 점수 합산
  const parentScores = {};
  for (const m of childMatches) {
    const md = m.metadata || {};
    const pid = parseInt(md.parent_id ?? -1, 10);
    if (pid === -1) continue;
    parentScores[pid] = (parentScores[pid] || 0) + (m.score || 0);
  }

  // 3. child hit 없으면 parent만 검색
  if (Object.keys(parentScores).length === 0) {
    const parents = await searchParentOnly(q, topParent);
    return [parents, childMatches];
  }

  // 4. parent 랭킹
  const ranked = Object.entries(parentScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topParent);
  const rankedPids = ranked.map(([pid]) => parseInt(pid, 10));

  // 5. parent fetch
  const fetched = await fetchParentsByIds(rankedPids);
  const parentCtxs = [];
  for (const [pidStr, sc] of ranked) {
    const pid = parseInt(pidStr, 10);
    const meta = fetched[pid];
    if (!meta) continue;
    parentCtxs.push({
      parent_id: pid,
      place: meta.place || UNKNOWN_PLACE_TOKEN,
      time_window: meta.time_window,
      text: meta.text || "",
      score: Number(sc.toFixed(4)),
    });
  }

  // 6. 부족하면 parent 직접 query
  if (parentCtxs.length < topParent) {
    const pres = await index.query({
      vector: v,
      topK: Math.max(4, topParent * 2),
      includeMetadata: true,
      includeValues: false,
      filter: { type: { $eq: "parent" } },
    });

    const seen = new Set(parentCtxs.map((p) => p.parent_id));
    for (const m of getMatches(pres)) {
      const md = m.metadata || {};
      const pid = parseInt(md.parent_id ?? -1, 10);
      if (pid === -1 || seen.has(pid)) continue;
      parentCtxs.push({
        parent_id: pid,
        place: md.place || UNKNOWN_PLACE_TOKEN,
        time_window: md.time_window,
        text: md.text || "",
        score: m.score || 0,
      });
      seen.add(pid);
      if (parentCtxs.length >= topParent) break;
    }
  }

  // 7. 정렬
  if (preferPlace) {
    parentCtxs.sort(
      (a, b) =>
        (a.place === UNKNOWN_PLACE_TOKEN ? 1 : -1) ||
        b.score - a.score
    );
  } else {
    parentCtxs.sort((a, b) => b.score - a.score);
  }

  return [parentCtxs.slice(0, topParent), childMatches];
}

// =========================
// RAG Wrapper
// =========================
export async function findRag(str) {
  const [parents, childHits] = await searchHybrid(str, {
    topChild: 8,
    topParent: 8,
    preferPlace: true,
  });
  return [parents, childHits];
}

// =========================
// Block Formatter
// =========================
export function mixBlock(parents, maxParents, maxParentTextChars) {
  if (!Array.isArray(parents)) return [];
  return parents.slice(0, maxParents).map((p) => {
    const place = p.place || UNKNOWN_PLACE_TOKEN;
    let text = p.text || "";
    if (maxParentTextChars && text.length > maxParentTextChars) {
      text = text.slice(0, maxParentTextChars) + "…";
    }
    return `[place: ${place}]\n${text}`;
  });
}



export async function buildPromptPlaceText(
  query,
  {
    maxParents = 4,
    maxParentTextChars = 1200,
    systemRole = `당신은 RAG 기반 답변 어시스턴트입니다.
아래 [CONTEXT]에는 사용자가 실제로 방문/기록한 장소(place)와  그 설명(text)이 포함되어 있습니다.
당신의 임무는 다음과 같습니다:
1) 사용자 질문의 의도를 파악하고, [CONTEXT]에서 의도에 맞는 장소를 선별합니다.
1-2) place:'x' 인곳은 최종결과로 제공해주면 안됩니다.
2) 선별된 장소는 place: 에서 가져오고 , 해당 장소에 대한 정보를  근거로 장소에 대한 설명을 해시태그 형식으로 간단하게 작성해주세요.
3) [CONTEXT]에 없는 정보는 절대 추측/생성하지 말고, '제공된 컨텍스트에 없습니다.'라고 명확히 밝힙니다.
4) 동일/유사 장소가 여러 개면 중복을 제거하고 핵심만 통합해 제시합니다.`
  } = {}
) {
  // 1) findRag 실행
  
  const [parents, childHits] = await findRag(query);
   
  
  // 2) 부모/자식 block 생성 
  const parentBlock = mixBlock(parents, maxParents, maxParentTextChars);
  const childBlock = mixBlock(childHits, maxParents, maxParentTextChars);

  const contextParent =
    parentBlock && parentBlock.length > 0
      ? parentBlock.join("\n\n")
      : "(컨텍스트 없음)";
  const contextChild =
    childBlock && childBlock.length > 0
      ? childBlock.join("\n\n")
      : "(컨텍스트 없음)";

  // 3) 최종 프롬프트
  const promptText = `
[QUERY]
${query}

[CONTEXT]
[부모 응답]
${contextParent}

[자식 응답]
${contextChild}

[OUTPUT SPEC]
아래 JSON 스키마를 엄격히 따르세요. JSON 이외의 어떤 텍스트도 출력하지 마세요.

- googleplace: string | null
  • 사용자의 질문과  관련 높은 장소명을 (place: 에서 가져와). 없다면 null.
- instruction: string
  • 사용자의 요청 의도에 맞게, 위 컨텍스트(부모/자식) 근거로 작성한 장소 설명을 해시태그 형식으로 

[RESPONSE JSON TEMPLATE]
JSON 배열 형식으로만 출력하세요
예시: 
{
  "results": [
    {
      "googleplace": "",
      "instruction": "# .. # ...."
    },
    {
      "googleplace": "",
      "instruction": "#... #... #..."
    }
  ]
}
`;

  // 4) Chat/Responses API messages 형태로 반환
  const messages = [
    { role: "system", content: systemRole },
    { role: "user", content: promptText },
  ];

  return messages;
}