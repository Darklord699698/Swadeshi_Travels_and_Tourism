import express from 'express';
import cors from 'cors';
import { Telegraf } from 'telegraf';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

import bookingRoutes from './src/routes/bookingRoutes.js';
import contactRoutes from "./src/routes/contactRoutes.js";

dotenv.config();

const app = express(); // ✅ Define FIRST

// Validate required environment variables
if (
  !process.env.TELEGRAM_TOKEN ||
  !process.env.GEMINI_API_KEY ||
  !process.env.RESEND_API_KEY
) {
  console.error("❌ Missing required environment variables");
  process.exit(1);
}

// Middleware
app.use(cors({
  origin: [
    'https://swadeshi-travels-frontend.onrender.com',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api', bookingRoutes);
app.use('/api', contactRoutes);

// Telegram Bot
export const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// AI Model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const aiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const SYSTEM_PROMPT = `You are Bharat Trails AI. Greet with Namaste. Focus on Uttarakhand village tourism.`;

// Split long Telegram messages
const sendLongMessage = async (ctx, text) => {
  const maxLength = 4000;
  for (let i = 0; i < text.length; i += maxLength) {
    await ctx.reply(text.substring(i, i + maxLength));
  }
};

bot.on('text', async (ctx) => {
  try {
    console.log(`📩 Message from ${ctx.from.first_name}`);
    await ctx.sendChatAction('typing');

    const result = await aiModel.generateContent([SYSTEM_PROMPT, ctx.message.text]);
    const response = await result.response;

    await sendLongMessage(ctx, response.text());
  } catch (error) {
    console.error("Bot AI Error:", error);
    ctx.reply("Namaste! Something went wrong. Try again later.");
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT}`);
});

// Launch Telegram bot
bot.launch()
  .then(() => console.log("✅ Telegram Bot Live!"))
  .catch((err) => {
    if (err.response?.error_code === 409) {
      console.warn("⚠️ Telegram Bot Conflict (409)");
    } else {
      console.error("❌ Bot Launch Error:", err);
    }
  });

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
