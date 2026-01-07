import cron from "node-cron";
import { prisma } from "../../config/db";


cron.schedule("0 0 * * *", async () => {
  console.log("🧹 Cleaning old chats...");
  await prisma.chat.deleteMany({
    where: {
      createdAt: {
        lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
  });
});
