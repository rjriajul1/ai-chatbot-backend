import bcrypt from "bcrypt";
import { prisma } from "../../config/db";
import { generateToken } from "../../config/jwt";
import { sendVerificationEmail } from "../jobs/email.job";

const  signup = async(data: any) =>{
  const { username, email, password } = data;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new Error("User already exists");

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { username, email, password: hash },
  });

  await sendVerificationEmail(user.email);

  return { message: "Signup successful. Verification email sent." };
}

const login = async(data: any) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken({ id: user.id, email: user.email });

  return { token, user: { id: user.id, email: user.email } };
}

export const authService = {
 signup,
 login
}
