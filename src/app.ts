import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import authRoutes from "./modules/auth/auth.routes";
// import chatRoutes from "./modules/chat/chat.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",);
app.use("/api/chat",);

app.get("/", (_req, res) => {
  res.send("AI Chatbot Backend Running...");
});

export default app;
