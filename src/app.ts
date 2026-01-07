import express, { Request, Response } from "express";
import cors from "cors";
import router from "./modules/auth/auth.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth/api', router)

app.get("/", (req:Request, res:Response) => {
  res.send("AI Chatbot Backend Running...");
});

export default app;
