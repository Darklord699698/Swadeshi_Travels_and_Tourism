import nodemailer from 'nodemailer';
import { bot } from '../../server.js';
import dotenv from 'dotenv';

// Ensure .env is loaded specifically for this file
dotenv.config(); 

export const sendReceipt = async (req, res) => {
  const { 
    userEmail, fullName, age, state, city, pincode, 
    tripName, total, orderId, travelDate, phone, breakdown, additionalTravelers 
  } = req.body;

  // 1. Create the Group Members HTML using TABLES (Email-safe rows)
  const travelersListHtml = additionalTravelers && additionalTravelers.length > 0 
    ? additionalTravelers.map((t, idx) => `
        <tr>
          <td align="left" style="padding: 12px; border-top: 1px solid #333; font-size: 13px;">
            <b style="color: #ffffff;">${idx + 2}. ${t.name}</b>
          </td>
          <td align="center" style="padding: 12px; border-top: 1px solid #333; font-size: 11px; color: #71717a;">
            <span style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 10px;">${t.age} YRS</span>
          </td>
          <td align="right" style="padding: 12px; border-top: 1px solid #333; font-family: monospace; font-size: 11px; color: #71717a;">
            ${t.phone}
          </td>
        </tr>
      `).join('')
    : `<tr><td colspan="3" style="padding: 15px; color: #71717a; font-style: italic; text-align: center;">No additional explorers registered.</td></tr>`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'darklord8527789390@gmail.com',
      pass: process.env.EMAIL_PASS 
    }
  });

  const userMailOptions = {
    from: '"Bharat Trails" <darklord8527789390@gmail.com>',
    to: userEmail,
    subject: `Manifest Confirmed: ${tripName} (Ref: ${orderId})`,
    html: `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 10px;">
      <tr>
        <td align="center">
          <div style="font-family: sans-serif; max-width: 500px; background-color: #121212; color: #ffffff; border-radius: 40px; overflow: hidden; border: 1px solid #333;">
            
            <div style="background-color: #ea580c; padding: 35px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; color: #ffffff; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">BOOKING MANIFEST</h1>
              <p style="margin: 8px 0 0 0; font-size: 11px; font-weight: bold; color: #ffffff; opacity: 0.8; letter-spacing: 1px;">ORDER ID: ${orderId}</p>
            </div>

            <div style="padding: 40px 30px;">
              <h2 style="margin: 0; font-size: 22px; font-style: italic; color: #ffffff; font-weight: 900;">Namaste, ${fullName}</h2>
              
              <table border="0" cellspacing="0" cellpadding="0" style="margin: 15px auto 25px auto;">
                <tr>
                  <td style="background-color: #1e1e1e; color: #a1a1aa; font-size: 9px; font-weight: 800; padding: 5px 12px; border-radius: 50px; border: 1px solid #333;">AGE: ${age}</td>
                  <td width="8"></td>
                  <td style="background-color: #1e1e1e; color: #a1a1aa; font-size: 9px; font-weight: 800; padding: 5px 12px; border-radius: 50px; border: 1px solid #333;">📍 ${city}, ${state}</td>
                  <td width="8"></td>
                  <td style="background-color: #1e1e1e; color: #a1a1aa; font-size: 9px; font-weight: 800; padding: 5px 12px; border-radius: 50px; border: 1px solid #333;">PIN: ${pincode}</td>
                </tr>
              </table>

              <p style="margin: 0 0 25px 0; color: #a1a1aa; line-height: 1.6; font-size: 14px; text-align: center;">
                Your expedition manifest for <b style="color: #ffffff;">${tripName}</b> has been successfully generated and confirmed.
              </p>
              
              <p style="text-transform: uppercase; font-size: 9px; font-weight: 900; color: #ea580c; letter-spacing: 2px; margin-bottom: 12px; text-align: left;">👥 Expedition Team</p>
              <div style="background-color: #1e1e1e; border-radius: 20px; border: 1px solid #333; margin-bottom: 30px; overflow: hidden;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="left" style="padding: 12px; font-size: 13px;"><b style="color: #ffffff;">1. ${fullName}</b> <span style="font-size: 10px; color: #71717a;">(Lead)</span></td>
                    <td align="center" style="padding: 12px;"></td>
                    <td align="right" style="padding: 12px; color: #71717a; font-family: monospace; font-size: 11px;">${phone}</td>
                  </tr>
                  ${travelersListHtml}
                </table>
              </div>

              <div style="background-color: #1e1e1e; padding: 30px; border-radius: 30px; margin-bottom: 30px; border: 1px solid #333; text-align: center;">
                <p style="margin: 0 0 5px 0; font-size: 9px; font-weight: 900; color: #71717a; text-transform: uppercase; letter-spacing: 2px;">Grand Total</p>
                <h2 style="margin: 0; color: #ea580c; font-size: 42px; font-weight: 900;">₹${Number(total).toLocaleString()}</h2>
                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #333; font-size: 10px; font-weight: bold; color: #71717a; text-transform: uppercase; letter-spacing: 1px;">
                  DEPARTURE: ${travelDate}
                </div>
              </div>

              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="font-size: 12px; color: #d1d5db;">
                <tr><td>Homestay Support (40%)</td><td align="right" style="font-family: monospace; color: #ffffff;">₹${Number(breakdown.homestay).toLocaleString()}</td></tr>
                <tr><td>Local Guide & Expertise (25%)</td><td align="right" style="font-family: monospace; color: #ffffff;">₹${Number(breakdown.guide).toLocaleString()}</td></tr>
                <tr><td>Farmers & Sustenance (20%)</td><td align="right" style="font-family: monospace; color: #ffffff;">₹${Number(breakdown.farmers).toLocaleString()}</td></tr>
                <tr><td style="color: #ea580c; font-weight: bold; border-top: 1px solid #333; padding-top: 12px;">Platform Fee (15%)</td><td align="right" style="color: #ea580c; font-weight: bold; font-family: monospace; border-top: 1px solid #333; padding-top: 12px;">₹${Number(breakdown.platform).toLocaleString()}</td></tr>
              </table>
            </div>
          </div>
        </td>
      </tr>
    </table>`
  };
  // --- 2. ADMIN'S EMAIL: THE LOG ALERT ---
  const adminMailOptions = {
    from: '"Gramyatra Admin" <darklord8527789390@gmail.com>',
    to: 'darklord8527789390@gmail.com',
    subject: `🚨 NEW BOOKING ALERT: ${fullName} - ${tripName}`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; background-color: #0f172a; color: #ffffff; border-radius: 24px; overflow: hidden; margin: auto; border: 1px solid #1e293b;">
        <div style="background: linear-gradient(to right, #ea580c, #f97316); padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; font-weight: 900;">New Expedition Logged</h1>
          <div style="display: inline-block; margin-top: 15px; padding: 5px 15px; background: rgba(0,0,0,0.2); border-radius: 10px; font-family: monospace;">ID: ${orderId}</div>
        </div>
        <div style="padding: 40px 30px;">
          <div style="margin-bottom: 30px;">
            <p style="color: #ea580c; text-transform: uppercase; font-size: 12px; font-weight: 800; margin-bottom: 10px;">Lead Explorer Info</p>
            <h2 style="font-size: 24px; margin: 0;">${fullName} (Age: ${age})</h2>
            <p style="color: #94a3b8; margin: 5px 0;">${userEmail} | ${phone}</p>
            <p style="color: #94a3b8; margin: 5px 0;">Location: ${city}, ${state} - ${pincode}</p>
          </div>

          <div style="margin-bottom: 30px; background: #1e293b; padding: 20px; border-radius: 20px;">
            <p style="color: #ea580c; text-transform: uppercase; font-size: 12px; font-weight: 800; margin-bottom: 10px;">Additional Group Members</p>
            ${travelersListHtml}
          </div>

          <div style="background-color: #1e293b; padding: 25px; border-radius: 20px; border: 1px solid #334155;">
            <p style="color: #ea580c; text-transform: uppercase; font-size: 12px; font-weight: 800; margin-bottom: 10px;">Revenue Summary</p>
            <div style="display: flex; justify-content: space-between;"><span style="color: #94a3b8;">Destination:</span> <span style="font-weight: 600;">${tripName}</span></div>
            <div style="display: flex; justify-content: space-between;"><span style="color: #94a3b8;">Departure:</span> <span style="font-weight: 600;">${travelDate}</span></div>
            <h2 style="text-align: center; color: #ea580c; font-size: 36px; margin-top: 20px;">₹${Number(total).toLocaleString()}</h2>
          </div>
        </div>
      </div>`
  };

  try {
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    if (process.env.MY_CHAT_ID) {
      await bot.telegram.sendMessage(
        process.env.MY_CHAT_ID, 
        `🚀 *New Booking Alert!*\n\nExplorer: ${fullName} (${city})\nGroup Size: ${1 + (additionalTravelers?.length || 0)}\nTrip: ${tripName}\nTotal: ₹${Number(total).toLocaleString()}`, 
        { parse_mode: 'Markdown' }
      );
    }

    res.status(200).json({ success: true, message: "Emails Dispatched" });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ success: false });
  }
};