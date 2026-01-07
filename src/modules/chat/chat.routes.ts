import { Router } from "express";
import { chatController } from "./chat.controller";
import authMiddleware from "../middlewares/auth.middleware";
// import { sendMessage, getChatHistory } from "./chat.controller";
// import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// Protected routes
router.get("/history",authMiddleware, chatController.getChatHistory);
router.post("/create/chat",authMiddleware, chatController.sendMessage );

export default router;
