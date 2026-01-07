import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import OpenAI from "openai";
import config from '../../config'
const openai = new OpenAI({ apiKey: config.openai_api_key});

export async function ragAnswer(question: string) {
  // Step 1: retrieve relevant documents
  const docs = await prisma.document.findMany({
    where: { content: { contains: question, mode: "insensitive" } },
    take: 3,
  });

  const context = docs.map(d => d.content).join("\n");

  // Step 2: create prompt
  const prompt = `
  Use the following information to answer:
  ${context}

  Question: ${question}
  `;

  // Step 3: call OpenAI
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });

  // Step 4: fallback
  const answer = response.choices?.[0]?.message?.content || 
                 "I'm sorry, I don't have an answer to that.";

  return answer;
}
