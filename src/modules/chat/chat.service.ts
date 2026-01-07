import { prisma } from "../../config/db";
import { ragAnswer } from "../rag/rag.service";

const getChatHistory=  async (userId: string) => {
  const chats = await prisma.chat.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
  return chats;
}

const sendMessage = async(userId: string, message: string) => {
  // Save user message
  await prisma.chat.create({
    data: { userId, role: "user", message },
  });

  // Get AI response from RAG
  const reply = await ragAnswer(message);

  // Save AI response
  await prisma.chat.create({
    data: { userId, role: "assistant", message: reply },
  });

  return { reply };
}


export const serviceChat = {
    getChatHistory,
    sendMessage
}