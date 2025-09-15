import { NextResponse } from "next/server";
import OpenAI from "openai";
import {buildPromptPlaceText} from './handler'


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/find_location
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question = body.video_url;
    const country= body.country

    // RAG 기반 프롬프트 생성 (Python `build_prompt_place_text`에 해당)
    const answer = await buildPromptPlaceText(question,country);

    const resp = await client.chat.completions.create({
      model: "gpt-5",
      reasoning_effort: "minimal",
      messages: answer as any,
      response_format: { type: "json_object" },
    });

    const content = resp.choices[0].message?.content;
   
    if (!content) {
      return NextResponse.json({ error: "LLM 응답이 비어 있음" }, { status: 500 });
    }

    const parsed = JSON.parse(content);

    return NextResponse.json(parsed.results);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
