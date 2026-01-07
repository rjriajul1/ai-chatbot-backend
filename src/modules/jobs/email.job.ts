import nodemailer from "nodemailer";
import config from "../../config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: config.email_user,
    pass: config.email_pass,
  },
});

export async function sendVerificationEmail(to: string) {
  await transporter.sendMail({
    from: `"AI Chatbot" <${process.env.EMAIL_USER}>`,
    to: "riajul.karim52@gmail.com",
    subject: "Verify your account",
    html: `<h3>Welcome!</h3><p>Your account has been created successfully.</p>`,
  });
}

