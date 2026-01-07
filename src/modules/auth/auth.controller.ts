import { Request, Response } from "express";
import { authService } from "./auth.service";


const  signup = async(req: Request, res: Response) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json(user);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

const login = async(req: Request, res: Response) => {
  try {

    const data = await authService.login(req.body);
    res.json(data);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
}

export const authController = {
    signup,
    login
}