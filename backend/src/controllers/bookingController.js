import nodemailer from 'nodemailer';
import { bot } from '../../server.js';
import dotenv from 'dotenv';

// Ensure .env is loaded specifically for this file
dotenv.config(); 

export const sendReceipt = async (req, res) => {
  const { userEmail, fullName, tripName, total, orderId, travelDate, phone, breakdown } = req.body;

  // Initialize transporter inside the function to ensure process.env is populated
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'darklord8527789390@gmail.com',
      pass: process.env.EMAIL_PASS // Must be the 16-digit App Password
    }
  });

  // Verify credentials exist before proceeding to prevent "PLAIN" error
  if (!process.env.EMAIL_PASS) {
    console.error("❌ Critical: EMAIL_PASS is undefined in the Controller.");
    return res.status(500).json({ success: false, message: "Server authentication error" });
  }

  // --- 1. USER'S EMAIL: THE DARK MANIFEST ---
  const userMailOptions = {
    from: '"Gramyatra" <darklord8527789390@gmail.com>',
    to: userEmail, // Sends to whatever email the user entered in the form
    subject: `Manifest Confirmed: ${tripName} (Ref: ${orderId})`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; background-color: #121212; color: #ffffff; border-radius: 20px; overflow: hidden; margin: auto; border: 1px solid #333;">
        <div style="background-color: #ea580c; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; letter-spacing: 2px; color: #ffffff;">BOOKING MANIFEST</h1>
          <p style="margin: 5px 0; font-size: 14px; opacity: 0.8; color: #ffffff;">Order ID: ${orderId}</p>
        </div>
        <div style="padding: 40px;">
          <h2 style="margin: 0; font-size: 24px; color: #ffffff;">Namaste, ${fullName}</h2>
          <p style="margin: 20px 0; color: #a1a1aa; line-height: 1.6;">Your expedition manifest for <b>${tripName}</b> has been successfully generated.</p>
          <div style="background-color: #1e1e1e; padding: 30px; border-radius: 25px; margin: 30px 0; border: 1px solid #333;">
            <p style="margin: 0; font-size: 14px; color: #a1a1aa;">Departure Date: ${travelDate}</p>
            <h2 style="margin: 10px 0 0 0; color: #ea580c; font-size: 32px;">Grand Total: ₹${Number(total).toLocaleString()}</h2>
          </div>
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 20px;">Economic Impact Breakdown</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 12px 0; color: #d1d5db;">Homestay Support (40%)</td><td style="text-align: right; color: #ffffff;">₹${Number(breakdown.homestay).toLocaleString()}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 12px 0; color: #d1d5db;">Local Guide Fee (25%)</td><td style="text-align: right; color: #ffffff;">₹${Number(breakdown.guide).toLocaleString()}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 12px 0; color: #d1d5db;">Farmers & Food (20%)</td><td style="text-align: right; color: #ffffff;">₹${Number(breakdown.farmers).toLocaleString()}</td></tr>
            <tr><td style="padding: 12px 0; color: #ea580c; font-weight: bold;">Platform Fee (15%)</td><td style="text-align: right; color: #ea580c; font-weight: bold;">₹${Number(breakdown.platform).toLocaleString()}</td></tr>
          </table>
        </div>
      </div>`
  };

  // --- 2. ADMIN'S EMAIL: THE LOG ALERT ---
  const adminMailOptions = {
    from: '"Gramyatra Admin" <darklord8527789390@gmail.com>',
    to: 'darklord8527789390@gmail.com', // Always sent to you
    subject: `🚨 NEW BOOKING ALERT: ${fullName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; background-color: #0f172a; color: #ffffff; border-radius: 20px; overflow: hidden; margin: auto; border: 2px solid #ea580c;">
        <div style="padding: 30px; text-align: center;">
          <h1 style="color: #ea580c; margin: 0; font-size: 28px;">New Expedition Logged</h1>
          <p style="color: #94a3b8; font-size: 14px; margin-top: 5px;">ORDER ID: ${orderId}</p>
        </div>
        <div style="padding: 30px;">
           <p style="font-size: 18px; margin: 5px 0;"><b>Name:</b> ${fullName}</p>
           <p style="color: #94a3b8; margin: 5px 0;">Email: ${userEmail}</p>
           <p style="color: #94a3b8; margin: 5px 0;">Phone: ${phone}</p>
           <hr style="border: 0; border-top: 1px solid #334155; margin: 25px 0;" />
           <p style="margin: 5px 0;">Expedition: ${tripName}</p>
           <h2 style="font-size: 32px; margin-top: 15px;">Revenue: ₹${Number(total).toLocaleString()}</h2>
        </div>
      </div>`
  };

  try {
    console.log(`📩 Dispatching receipt to USER: ${userEmail}`);
    await transporter.sendMail(userMailOptions);
    
    console.log(`📩 Dispatching admin alert to: darklord8527789390@gmail.com`);
    await transporter.sendMail(adminMailOptions);

    if (process.env.MY_CHAT_ID) {
      await bot.telegram.sendMessage(process.env.MY_CHAT_ID, `🚀 *New Booking Alert!*\n\nExplorer: ${fullName}\nTrip: ${tripName}\nTotal: ₹${Number(total).toLocaleString()}`, { parse_mode: 'Markdown' });
    }

    res.status(200).json({ success: true, message: "Emails Dispatched" });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ success: false });
  }
};