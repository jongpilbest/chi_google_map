// utils/rag.js
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const UNKNOWN_PLACE_TOKEN = "x";
const MAX_CHILD_TEXT_LEN = 2000;
const BATCH = 128;
const EMBED_MODEL_NAME = "text-embedding-3-small";

// =========================
// OpenAI + Pinecone 초기화
// =========================
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const pc = new Pinecone({ apiKey: PINECONE_API_KEY });

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
// Child Only 검색
// =========================
export async function searchChildOnly(q, topK = 10, index) {
  const v = await embedQuery(q);
  const res = await index.query({
    vector: v,
    topK,
    includeMetadata: true,
    includeValues: false,
    filter: { type: { $eq: "child" } },
  });

  const matches = getMatches(res);
  return matches.map((m) => {
    const md = m.metadata || {};
    return {
      place: md.place || UNKNOWN_PLACE_TOKEN,
      time_window: md.time_window,
      text: md.text || "",
      score: m.score || 0,
    };
  });
}

// =========================
// RAG Wrapper (child only)
// =========================
export async function findRag(str, index) {
  const childHits = await searchChildOnly(str, 10, index);
  return childHits;
}

// =========================
// Block Formatter
// =========================
export function mixBlock(children, maxChildren, maxTextChars) {
  if (!Array.isArray(children)) return [];
  return children.slice(0, maxChildren).map((c) => {
    const place = c.place || UNKNOWN_PLACE_TOKEN;
    let text = c.text || "";
    if (maxTextChars && text.length > maxTextChars) {
      text = text.slice(0, maxTextChars) + "…";
    }
    return `[place: ${place}]\n${text}`;
  });
}

// =========================
// Prompt Builder (child only)
// =========================
export async function buildPromptPlaceText(
  query,
  country,
  {
    maxChildren = 8,
    maxChildTextChars = 1200,
    systemRole = `당신은 RAG 기반 답변 어시스턴트입니다.
아래 [CONTEXT]에는 사용자가 실제로 방문/기록한 장소(place)와 그 설명(text)이 포함되어 있습니다.
당신의 임무는 다음과 같습니다:
1) 사용자 질문의 의도를 파악하고, [CONTEXT]에서 의도에 맞는 장소를 선별합니다.
1-2) place:'x' 인곳은 최종결과로 제공해주면 안됩니다.
2) 선별된 장소는 place: 에서 가져오고 , 해당 장소에 대한 정보를 근거로 장소에 대한 설명을 해시태그 형식으로 간단하게 작성해주세요.
3) [CONTEXT]에 없는 정보는 절대 추측/생성하지 말고, 결과가 없는 경우 빈배열을 제공해주세요
4) 동일/유사 장소가 여러 개면 중복을 제거하고 핵심만 통합해 제시합니다.`
  } = {}
) {
  // 1) findRag 실행
  const index = pc.Index(country);
  const childHits = await findRag(query, index);

  // 2) block 생성 
  const childBlock = mixBlock(childHits, maxChildren, maxChildTextChars);

  const contextChild =
    childBlock && childBlock.length > 0
      ? childBlock.join("\n\n")
      : "(컨텍스트 없음)";

  // 3) 최종 프롬프트
  const promptText = `
[QUERY]
${query}

[CONTEXT]
${contextChild}

[OUTPUT SPEC]
아래 JSON 스키마를 엄격히 따르세요. JSON 이외의 어떤 텍스트도 출력하지 마세요.

- googleplace: string | null
  • 사용자의 질문과 관련 높은 장소명을 (place: 에서 가져와). 없다면 null.
- instruction: string
  • 사용자의 요청 의도에 맞게, 위 컨텍스트 근거로 작성한 장소 설명을 해시태그 형식으로

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

  const messages = [
    { role: "system", content: systemRole },
    { role: "user", content: promptText },
  ];

  return messages;
}
