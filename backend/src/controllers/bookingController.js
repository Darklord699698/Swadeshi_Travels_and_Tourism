import { Resend } from "resend";
import dotenv from "dotenv";
import BookingModel from '../models/BookingModel.js';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReceipt = async (req, res) => {
  const {
    userEmail,
    fullName,
    age,
    state,
    city,
    pincode,
    tripName,
    total,
    orderId,
    travelDate,
    phone,
    breakdown = {},
    additionalTravelers = [],
  } = req.body;
  try {
    const booking = new BookingModel(req.body);
    await booking.save();
    console.log('✅ Booking saved to MongoDB:', req.body.orderId);
  } catch (err) {
    console.error('❌ MongoDB save error:', err);
  }

  const formatCurrency = (num) =>
    `₹${Number(num || 0).toLocaleString("en-IN")}`;

  /* ---------------- TEAM TABLE ---------------- */
  const travelersListHtml =
    additionalTravelers.length > 0
      ? additionalTravelers
          .map(
            (t, idx) => `
        <tr>
          <td style="padding:12px;border-top:1px solid #2a2a2a;color:#ffffff;font-size:13px;">
            <b>${idx + 2}. ${t.name}</b>
          </td>
          <td align="center" style="padding:12px;border-top:1px solid #2a2a2a;color:#71717a;font-size:11px;">
            ${t.age} YRS
          </td>
          <td align="right" style="padding:12px;border-top:1px solid #2a2a2a;color:#71717a;font-size:11px;">
            ${t.phone}
          </td>
        </tr>
      `
          )
          .join("")
      : `
        <tr>
          <td colspan="3" align="center" style="padding:15px;color:#71717a;font-style:italic;">
            No additional explorers registered.
          </td>
        </tr>
      `;

  /* ================= USER RECEIPT ================= */
  const userHtml = `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 10px;font-family:Arial,sans-serif;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;background:#121212;border-radius:25px;overflow:hidden;border:1px solid #222;">

          <!-- HEADER -->
          <tr>
            <td align="center" style="background:#ea580c;padding:40px 20px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;letter-spacing:3px;text-transform:uppercase;">
                Booking Manifest
              </h1>
              <p style="margin:8px 0 0 0;color:#ffffff;font-size:12px;opacity:0.9;">
                ORDER ID: ${orderId}
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:40px 35px;color:#ffffff;">

              <h2 style="margin:0;font-size:22px;font-style:italic;">
                Namaste, ${fullName}
              </h2>

              <!-- IDENTITY CHIPS -->
              <div style="margin-top:15px;margin-bottom:25px;">
                <span style="display:inline-block;margin:3px;padding:6px 12px;background:#1e1e1e;border-radius:20px;font-size:11px;color:#a1a1aa;">
                  Age: ${age}
                </span>
                <span style="display:inline-block;margin:3px;padding:6px 12px;background:#1e1e1e;border-radius:20px;font-size:11px;color:#a1a1aa;">
                  ${city}, ${state}
                </span>
                <span style="display:inline-block;margin:3px;padding:6px 12px;background:#1e1e1e;border-radius:20px;font-size:11px;color:#a1a1aa;">
                  PIN: ${pincode}
                </span>
              </div>

              <p style="color:#a1a1aa;font-size:14px;line-height:1.6;">
                Your expedition manifest for 
                <b style="color:#ffffff;">${tripName}</b> 
                has been successfully generated and confirmed.
              </p>

              <!-- TEAM -->
              <div style="margin-top:35px;background:#1e1e1e;border-radius:20px;padding:25px;">
                <div style="color:#ea580c;font-size:11px;font-weight:bold;text-transform:uppercase;margin-bottom:15px;">
                  Expedition Team
                </div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:12px;color:#ffffff;font-size:13px;">
                      <b>1. ${fullName} (Lead)</b>
                    </td>
                    <td align="right" style="padding:12px;color:#71717a;font-size:11px;">
                      ${phone}
                    </td>
                  </tr>
                  ${travelersListHtml}
                </table>
              </div>

              <!-- ECONOMIC BREAKDOWN -->
              <div style="margin-top:35px;background:#1e1e1e;padding:30px;border-radius:25px;text-align:center;border:1px solid #2a2a2a;">

                <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;color:#a1a1aa;">
                  <tr>
                    <td align="left">Homestay Support (40%)</td>
                    <td align="right" style="color:#ffffff;">${formatCurrency(breakdown.homestay)}</td>
                  </tr>
                  <tr>
                    <td align="left">Local Guide & Expertise (25%)</td>
                    <td align="right" style="color:#ffffff;">${formatCurrency(breakdown.guide)}</td>
                  </tr>
                  <tr>
                    <td align="left">Farmers & Sustenance (20%)</td>
                    <td align="right" style="color:#ffffff;">${formatCurrency(breakdown.farmers)}</td>
                  </tr>
                  <tr>
                    <td align="left">Platform Fee (15%)</td>
                    <td align="right" style="color:#ffffff;">${formatCurrency(breakdown.platform)}</td>
                  </tr>
                </table>

                <div style="margin-top:25px;font-size:11px;color:#71717a;text-transform:uppercase;">
                  Grand Total
                </div>

                <div style="font-size:36px;font-weight:bold;color:#ea580c;margin:10px 0;">
                  ${formatCurrency(total)}
                </div>

                <div style="font-size:11px;color:#71717a;text-transform:uppercase;">
                  Departure: ${travelDate}
                </div>

              </div>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;

  /* ================= ADMIN ALERT ================= */
  const adminHtml = `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 10px;font-family:Arial,sans-serif;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;background:#121212;border-radius:25px;overflow:hidden;border:1px solid #222;">

          <!-- HEADER -->
          <tr>
            <td align="center" style="background:#ea580c;padding:40px 20px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;letter-spacing:3px;text-transform:uppercase;">
                Booking Manifest
              </h1>
              <p style="margin:8px 0 0 0;color:#ffffff;font-size:12px;opacity:0.9;">
                ORDER ID: ${orderId}
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:40px 35px;color:#ffffff;">

              <h2 style="margin:0;font-size:22px;font-style:italic;">
                Namaste, ${fullName}
              </h2>

              <!-- IDENTITY CHIPS -->
              <div style="margin-top:15px;margin-bottom:25px;">
                <span style="display:inline-block;margin:3px;padding:6px 12px;background:#1e1e1e;border-radius:20px;font-size:11px;color:#a1a1aa;">
                  Age: ${age}
                </span>
                <span style="display:inline-block;margin:3px;padding:6px 12px;background:#1e1e1e;border-radius:20px;font-size:11px;color:#a1a1aa;">
                  ${city}, ${state}
                </span>
                <span style="display:inline-block;margin:3px;padding:6px 12px;background:#1e1e1e;border-radius:20px;font-size:11px;color:#a1a1aa;">
                  PIN: ${pincode}
                </span>
              </div>

              <p style="color:#a1a1aa;font-size:14px;line-height:1.6;">
                Your expedition manifest for 
                <b style="color:#ffffff;">${tripName}</b> 
                has been successfully generated and confirmed.
              </p>

              <!-- TEAM -->
              <div style="margin-top:35px;background:#1e1e1e;border-radius:20px;padding:25px;">
                <div style="color:#ea580c;font-size:11px;font-weight:bold;text-transform:uppercase;margin-bottom:15px;">
                  Expedition Team
                </div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:12px;color:#ffffff;font-size:13px;">
                      <b>1. ${fullName} (Lead)</b>
                    </td>
                    <td align="right" style="padding:12px;color:#71717a;font-size:11px;">
                      ${phone}
                    </td>
                  </tr>
                  ${travelersListHtml}
                </table>
              </div>

              <!-- ECONOMIC BREAKDOWN -->
              <div style="margin-top:35px;background:#1e1e1e;padding:30px;border-radius:25px;text-align:center;border:1px solid #2a2a2a;">

                <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;color:#a1a1aa;">
                  <tr>
                    <td align="left">Homestay Support (40%)</td>
                    <td align="right" style="color:#ffffff;">${formatCurrency(breakdown.homestay)}</td>
                  </tr>
                  <tr>
                    <td align="left">Local Guide & Expertise (25%)</td>
                    <td align="right" style="color:#ffffff;">${formatCurrency(breakdown.guide)}</td>
                  </tr>
                  <tr>
                    <td align="left">Farmers & Sustenance (20%)</td>
                    <td align="right" style="color:#ffffff;">${formatCurrency(breakdown.farmers)}</td>
                  </tr>
                  <tr>
                    <td align="left">Platform Fee (15%)</td>
                    <td align="right" style="color:#ffffff;">${formatCurrency(breakdown.platform)}</td>
                  </tr>
                </table>

                <div style="margin-top:25px;font-size:11px;color:#71717a;text-transform:uppercase;">
                  Grand Total
                </div>

                <div style="font-size:36px;font-weight:bold;color:#ea580c;margin:10px 0;">
                  ${formatCurrency(total)}
                </div>

                <div style="font-size:11px;color:#71717a;text-transform:uppercase;">
                  Departure: ${travelDate}
                </div>

              </div>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: "Swadeshi Travels <onboarding@resend.dev>",
        to: userEmail,
        subject: `YOUR RECEIPT - ${orderId}`,
        html: userHtml,
      }),
      resend.emails.send({
        from: "Swadeshi Travels <onboarding@resend.dev>",
        to: "darklord8527789390@gmail.com",
        subject: `🚨 NEW BOOKING RECEIPT - ${orderId}`,
        html: adminHtml,
      }),
    ]);

    console.log("✅ Premium Manifest Emails Sent");

    return res.status(200).json({
      success: true,
      message: "Manifest delivered successfully",
    });
  } catch (error) {
    console.error("❌ FULL RESEND ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Unknown error",
    });
  }
};