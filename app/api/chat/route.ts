import { NextResponse } from 'next/server';
import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";
import { checkStrictRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    // Check rate limit (only if IP is known)
    if (ip !== 'unknown') {
      const { allowed } = await checkStrictRateLimit(ip, 10);
      if (!allowed) {
        return NextResponse.json({
          response: "You've reached the daily limit of 10 messages per day. Please come back tomorrow to ask more questions!"
        }, { status: 429 });
      }
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json({ error: "Groq API key not configured" }, { status: 500 });
    }

    const groq = new Groq({ apiKey: groqApiKey });

    // Fetch AI context directly from Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: dbData } = await supabase.from('ai_context').select('content').limit(1).single();
    const portfolioContext = dbData?.content || "Information not found.";

    const systemPrompt = {
      role: "system",
      content: `You are a helpful, professional AI assistant embedded in the portfolio of Athuluri Akhil (often just called "Akhil"). Your job is ONLY to answer questions about Akhil, his experience, projects, skills, and background based on the provided context. 

When asked general questions like "who is Akhil?" or "tell me about him", provide a warm summary based on his Bio and About sections. Do not say "I couldn't find a detailed overview" - be confident using the information provided.

GUARDRAILS:
1. If the user asks about ANY topic unrelated to Athuluri Akhil (such as "who is the president of the USA or India", "write python code", "how to bake a cake", math problems, etc.), you MUST politely decline and state that you are specifically designed to answer questions about Athuluri Akhil's portfolio.
2. Do not write code for the user.
3. Be concise, polite, and helpful.

Here is the context about Athuluri Akhil:
${portfolioContext}`
    };

    // Filter out the first intro message if we want, or pass it all
    // Groq requires valid roles: system, user, assistant

    const validMessages = messages.filter(m => m.role === 'user' || m.role === 'assistant');

    const completion = await groq.chat.completions.create({
      messages: [systemPrompt, ...validMessages],
      model: "llama-3.1-8b-instant",
    });

    const responseContent = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({ response: responseContent });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
