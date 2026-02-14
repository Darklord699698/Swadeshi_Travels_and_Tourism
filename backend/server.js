import express from 'express';
import cors from 'cors';
import { Telegraf } from 'telegraf';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// Import refactored routes
import bookingRoutes from './src/routes/bookingRoutes.js';

dotenv.config();

// Validate all credentials before starting
if (!process.env.TELEGRAM_TOKEN || !process.env.GEMINI_API_KEY || !process.env.EMAIL_PASS) {
  console.error("❌ Missing credentials in .env");
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Telegram Bot & Export it for use in Controllers
export const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Initialize AI Model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// FIX: Changed model to "gemini-1.5-flash" to resolve the 404/Unsupported Model error
const aiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// --- USE REFACTORED ROUTES ---
app.use('/api', bookingRoutes);

// --- TELEGRAM BOT AI LOGIC ---
const SYSTEM_PROMPT = `You are Bharat Trails AI. Greet with Namaste. Focus on Uttarakhand village tourism.`;

// HELPER: Function to handle long messages by splitting them into chunks
const sendLongMessage = async (ctx, text) => {
  const maxLength = 4000; 
  for (let i = 0; i < text.length; i += maxLength) {
    const chunk = text.substring(i, i + maxLength);
    await ctx.reply(chunk);
  }
};

bot.on('text', async (ctx) => {
  try {
    console.log(`📩 Message from ${ctx.from.first_name} (ID: ${ctx.from.id})`);
    
    // Visual feedback for the user in Telegram
    await ctx.sendChatAction('typing');
    
    const result = await aiModel.generateContent([SYSTEM_PROMPT, ctx.message.text]);
    const response = await result.response;
    
    // FIX: Replaced ctx.reply with sendLongMessage to prevent character limit errors
    await sendLongMessage(ctx, response.text());

  } catch (error) {
    console.error("Bot AI Error:", error);
    ctx.reply("Namaste! Mist on the mountains. Try again later.");
  }
});

// Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT}`);
});

// Start Telegram Bot
bot.launch().then(() => {
  console.log("✅ Telegram Bot Live!");
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));