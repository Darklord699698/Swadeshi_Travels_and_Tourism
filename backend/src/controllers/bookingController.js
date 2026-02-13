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
    subject: `🚨 NEW BOOKING ALERT: ${fullName} - ${tripName}`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; background-color: #0f172a; color: #ffffff; border-radius: 24px; overflow: hidden; margin: auto; border: 1px solid #1e293b; shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
        
        <div style="background: linear-gradient(to right, #ea580c, #f97316); padding: 40px 30px; text-align: center;">
          <p style="text-transform: uppercase; letter-spacing: 3px; font-size: 12px; font-weight: 800; margin-bottom: 10px; color: rgba(255,255,255,0.8);">Internal Notification</p>
          <h1 style="margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1px;">New Expedition Logged</h1>
          <div style="display: inline-block; margin-top: 15px; padding: 5px 15px; background: rgba(0,0,0,0.2); border-radius: 10px; font-family: monospace; font-size: 14px;">
            ID: ${orderId}
          </div>
        </div>

        <div style="padding: 40px 30px;">
          
          <div style="margin-bottom: 35px;">
            <p style="color: #ea580c; text-transform: uppercase; font-size: 12px; font-weight: 800; margin-bottom: 15px; letter-spacing: 1px;">Explorer Profile</p>
            <h2 style="font-size: 24px; margin: 0; color: #f8fafc;">${fullName}</h2>
            <p style="color: #94a3b8; font-size: 16px; margin: 8px 0;">📧 ${userEmail}</p>
            <p style="color: #94a3b8; font-size: 16px; margin: 8px 0;">📞 ${phone}</p>
          </div>

          <div style="background-color: #1e293b; padding: 25px; border-radius: 20px; border: 1px solid #334155; margin-bottom: 35px;">
            <p style="color: #ea580c; text-transform: uppercase; font-size: 12px; font-weight: 800; margin-bottom: 15px; letter-spacing: 1px;">Trip Summary</p>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #94a3b8;">Destination:</span>
              <span style="color: #ffffff; font-weight: 600;">${tripName}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
              <span style="color: #94a3b8;">Departure Date:</span>
              <span style="color: #ffffff; font-weight: 600;">${travelDate}</span>
            </div>
            <hr style="border: 0; border-top: 1px solid #334155; margin: 15px 0;" />
            <div style="text-align: center; margin-top: 10px;">
              <p style="color: #94a3b8; font-size: 12px; margin-bottom: 5px;">GROSS REVENUE</p>
              <h2 style="font-size: 42px; margin: 0; color: #ea580c; font-weight: 900;">₹${Number(total).toLocaleString()}</h2>
            </div>
          </div>

          <div style="border-left: 4px solid #ea580c; padding-left: 20px; margin-bottom: 20px;">
            <p style="color: #f8fafc; font-weight: 700; margin-bottom: 10px;">Next Steps for Admin:</p>
            <ul style="color: #94a3b8; font-size: 14px; padding-left: 20px; line-height: 1.8;">
              <li>Verify payment status in the gateway dashboard.</li>
              <li>Contact the local guide assigned to <b>${tripName}</b>.</li>
              <li>Send a personalized welcome message to <b>${fullName}</b>.</li>
              <li>Finalize homestay availability for ${travelDate}.</li>
            </ul>
          </div>

        </div>

        <div style="background-color: #020617; padding: 20px; text-align: center; font-size: 11px; color: #475569; border-top: 1px solid #1e293b;">
          This is an automated notification from the Gramyatra Booking Engine.
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