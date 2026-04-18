import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { keyword } = await req.json();
  const k = String(keyword || "").trim();

  if (!k) {
    return NextResponse.json({ error: "Keyword required" }, { status: 400 });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `Create one short, punchy hook sentence about: ${k}.
Also provide a viral score from 1-100. Format:
HOOK: ...
SCORE: ...`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9
  });

  const text = res.choices[0]?.message?.content || "";
  const hookMatch = text.match(/HOOK:\s*(.+)/i);
  const scoreMatch = text.match(/SCORE:\s*(\d+)/i);

  return NextResponse.json({
    hook: hookMatch?.[1]?.trim() || text.trim(),
    score: scoreMatch?.[1] ? Number(scoreMatch[1]) : Math.floor(60 + Math.random() * 35)
  });
}