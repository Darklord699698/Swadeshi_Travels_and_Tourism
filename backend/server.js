import express from 'express';
import cors from 'cors';
import { Telegraf } from 'telegraf';
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Validate all credentials
if (!process.env.TELEGRAM_TOKEN || !process.env.GEMINI_API_KEY || !process.env.EMAIL_PASS) {
  console.error("❌ Missing credentials in .env");
  process.exit(1);
}

const app = express();
app.use(cors()); // Allows frontend to connect
app.use(express.json()); // Parses JSON data

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'darklord8527789390@gmail.com',
    pass: process.env.EMAIL_PASS 
  }
});

// --- NEW API ROUTE FOR REACT FORM ---
app.post('/api/enquiry', async (req, res) => {
  const { name, email, message, type } = req.body;

  const mailOptions = {
    from: 'Bharat Trails Website',
    to: 'darklord8527789390@gmail.com',
    subject: `New ${type} from ${name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #ea580c;">New Website Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Enquiry Received!" });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// --- TELEGRAM BOT LOGIC ---
const SYSTEM_PROMPT = `You are a Bharat Trails AI. Greet with Namaste. Focus on Uttarakhand.`;

bot.on('text', async (ctx) => {
  try {
    await ctx.sendChatAction('typing');
    const result = await model.generateContent([SYSTEM_PROMPT, ctx.message.text]);
    const response = await result.response;
    ctx.reply(response.text());
  } catch (error) {
    console.error("Bot AI Error:", error);
    ctx.reply("Namaste! Mist on the mountains. Try again later.");
  }
});

// Start Express Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 API Server running on port ${PORT}`));

// Start Telegram Bot
bot.launch().then(() => console.log("✅ Telegram Bot Live!"));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));