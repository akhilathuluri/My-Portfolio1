import { NextResponse } from 'next/server';
import Groq from "groq-sdk";
import { checkStrictRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const { content, title } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Blog content is required" }, { status: 400 });
    }

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    // Shared limit with chat API. Limit is 10 total AI generations per IP per day.
    if (ip !== 'unknown') {
      const { allowed } = await checkStrictRateLimit(ip, 10);
      if (!allowed) {
        return NextResponse.json({
          error: "You've reached your daily AI limit. Please come back tomorrow!"
        }, { status: 429 });
      }
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json({ error: "Groq API key not configured" }, { status: 500 });
    }

    const groq = new Groq({ apiKey: groqApiKey });

    const systemPrompt = {
      role: "system",
      content: "You are a friendly AI assistant on Athuluri Akhil's portfolio. Your job is to read the provided blog post and write a clear, engaging 2-3 sentence summary of what the article is about. Give the reader a great overview of the topic and what they will learn. Use at most one suitable emoji. Do not just repeat the post's instructions."
    };

    const userPrompt = {
      role: "user",
      content: `Blog Title: ${title}\n\nBlog Content:\n${content.substring(0, 3000)}` // Limit content to prevent token overflow
    };

    const completion = await groq.chat.completions.create({
      messages: [systemPrompt, userPrompt as any],
      model: "llama-3.1-8b-instant",
    });

    const summary = completion.choices[0]?.message?.content || "I couldn't generate a summary right now, but this is a great read!";

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summarize API Error:", error);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
