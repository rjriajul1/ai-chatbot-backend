import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { serviceChat } from "./chat.service";

const getChatHistory = async(req: AuthRequest, res: Response)=> {
  try {
    const userId = req.user.id;
    const history = await serviceChat.getChatHistory (userId);
    res.json(history);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}

const sendMessage = async(req: AuthRequest, res: Response)=> {
  try {
    const userId = req.user.id;
    const { message } = req.body;
    const response = await serviceChat.sendMessage(userId, message);
    res.json(response);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}

export const chatController = {
    getChatHistory,
    sendMessage
}
