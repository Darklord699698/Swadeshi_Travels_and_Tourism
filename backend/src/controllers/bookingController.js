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
    numberOfDays,  // ADD THIS
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
<div style="font-size:11px;color:#71717a;text-transform:uppercase;margin-top:8px;">
  Duration: ${numberOfDays || 1} Day${(numberOfDays || 1) > 1 ? 's' : ''}
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
              <div style="font-size:11px;color:#71717a;text-transform:uppercase;margin-top:8px;">
                Duration: ${numberOfDays || 1} Day${(numberOfDays || 1) > 1 ? 's' : ''}
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
export const cancelBooking = async (req, res) => {
  const {
    orderId,
    tripName,
    fullName,
    email,
    total,
    travelDate,
    bookedDate,
    numberOfDays,  // ADD THIS
  } = req.body;

  const formatCurrency = (num) =>
    `₹${Number(num || 0).toLocaleString("en-IN")}`;

  const cancelHtml = `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 10px;font-family:Arial,sans-serif;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;background:#121212;border-radius:25px;overflow:hidden;border:1px solid #222;">

          <!-- HEADER -->
          <tr>
            <td align="center" style="background:#dc2626;padding:40px 20px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;letter-spacing:3px;text-transform:uppercase;">
                ⚠️ Trip Cancellation
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
                Cancellation Request Received
              </h2>

              <p style="color:#a1a1aa;font-size:14px;line-height:1.6;margin-top:15px;">
                A cancellation request has been submitted for the following booking:
              </p>

              <!-- DETAILS BOX -->
              <div style="margin-top:25px;background:#1e1e1e;border-radius:20px;padding:25px;border:1px solid #2a2a2a;">
                <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;">
                  <tr>
                    <td style="color:#71717a;">Customer Name</td>
                    <td align="right" style="color:#ffffff;font-weight:bold;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="color:#71717a;border-top:1px solid #2a2a2a;">Email</td>
                    <td align="right" style="color:#ffffff;border-top:1px solid #2a2a2a;">${email}</td>
                  </tr>
                  <tr>
                    <td style="color:#71717a;border-top:1px solid #2a2a2a;">Trip Name</td>
                    <td align="right" style="color:#ea580c;font-weight:bold;border-top:1px solid #2a2a2a;">${tripName}</td>
                  </tr>
                  <tr>
                    <td style="color:#71717a;border-top:1px solid #2a2a2a;">Travel Date</td>
                    <td align="right" style="color:#ffffff;border-top:1px solid #2a2a2a;">${travelDate}</td>
                  </tr>
                  <tr>
                    <td style="color:#71717a;border-top:1px solid #2a2a2a;">Booked On</td>
                    <td align="right" style="color:#ffffff;border-top:1px solid #2a2a2a;">${bookedDate}</td>
                  </tr>
                  <tr>
  <td style="color:#71717a;border-top:1px solid #2a2a2a;">Duration</td>
  <td align="right" style="color:#ffffff;border-top:1px solid #2a2a2a;">${numberOfDays || 1} Day${(numberOfDays || 1) > 1 ? 's' : ''}</td>
</tr>
                  <tr>
                    <td style="color:#71717a;border-top:1px solid #2a2a2a;">Amount Paid</td>
                    <td align="right" style="color:#dc2626;font-weight:bold;font-size:18px;border-top:1px solid #2a2a2a;">${formatCurrency(total)}</td>
                  </tr>
                </table>
              </div>

              <!-- REFUND NOTE -->
              <div style="margin-top:25px;background:#dc2626/10;border:1px solid #dc2626;border-radius:15px;padding:20px;text-align:center;">
                <p style="margin:0;color:#fca5a5;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;">
                  Action Required
                </p>
                <p style="margin:8px 0 0 0;color:#a1a1aa;font-size:13px;">
                  Please process the refund of ${formatCurrency(total)} within 5-7 business days.
                </p>
              </div>

              <!-- TIMESTAMP -->
              <p style="margin-top:25px;color:#71717a;font-size:11px;text-align:center;text-transform:uppercase;letter-spacing:2px;">
                Cancellation requested on: ${new Date().toLocaleString('en-IN')}
              </p>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;

  try {
    const refundHtml = `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 10px;font-family:Arial,sans-serif;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;background:#121212;border-radius:25px;overflow:hidden;border:1px solid #222;">
        <tr>
          <td align="center" style="background:#16a34a;padding:40px 20px;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;letter-spacing:3px;text-transform:uppercase;">
              ✅ Refund Confirmation
            </h1>
            <p style="margin:8px 0 0 0;color:#ffffff;font-size:12px;opacity:0.9;">ORDER ID: ${orderId}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 35px;color:#ffffff;">
            <h2 style="margin:0;font-size:22px;font-style:italic;">Namaste, ${fullName}</h2>
            <p style="color:#a1a1aa;font-size:14px;line-height:1.6;margin-top:15px;">
              Your cancellation request for <b style="color:#ffffff;">${tripName}</b> has been processed. 
              A refund has been initiated to your original payment method.
            </p>
            <div style="margin-top:25px;background:#1e1e1e;border-radius:20px;padding:25px;border:1px solid #2a2a2a;text-align:center;">
              <p style="margin:0;color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Refund Amount</p>
              <p style="font-size:36px;font-weight:bold;color:#16a34a;margin:10px 0;">₹${Number(total).toLocaleString("en-IN")}</p>
              <p style="margin:0;color:#71717a;font-size:12px;">Your refund has been <b style="color:#16a34a;">successfully processed</b> to your original payment method.</p>
            </div>
            <div style="margin-top:25px;background:#1e1e1e;border-radius:15px;padding:20px;">
              <table width="100%" cellpadding="6" cellspacing="0" style="font-size:13px;">
                <tr>
                  <td style="color:#71717a;">Trip</td>
                  <td align="right" style="color:#ffffff;">${tripName}</td>
                </tr>
                <tr>
                  <td style="color:#71717a;border-top:1px solid #2a2a2a;">Travel Date</td>
                  <td align="right" style="color:#ffffff;border-top:1px solid #2a2a2a;">${travelDate}</td>
                </tr>
                <tr>
                  <td style="color:#71717a;border-top:1px solid #2a2a2a;">Cancelled On</td>
                  <td align="right" style="color:#ffffff;border-top:1px solid #2a2a2a;">${new Date().toLocaleString('en-IN')}</td>
                </tr>
              </table>
            </div>
            <p style="margin-top:25px;color:#71717a;font-size:12px;text-align:center;">
              If you have any questions, please contact us. We hope to welcome you back soon.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
console.log("=== CANCEL BOOKING DEBUG ===");
console.log("orderId:", orderId);
console.log("email:", email);
console.log("total:", total);
console.log("refundHtml length:", refundHtml.length);

try {
  const adminResult = await resend.emails.send({
    from: "Swadeshi Travels <onboarding@resend.dev>",
    to: "darklord8527789390@gmail.com",
    subject: `🚨 TRIP CANCELLATION - ${orderId} - ${tripName}`,
    html: cancelHtml,
  });
  console.log("✅ Admin email result:", JSON.stringify(adminResult));
} catch (err) {
  console.error("❌ Admin email FAILED:", err);
}

try {
  const refundResult = await resend.emails.send({
    from: "Swadeshi Travels <onboarding@resend.dev>",
    to: "darklord8527789390@gmail.com",
    subject: `✅ Refund Initiated - ${orderId}`,
    html: refundHtml,
  });
  console.log("✅ Refund email result:", JSON.stringify(refundResult));
} catch (err) {
  console.error("❌ Refund email FAILED:", err);
}

console.log("✅ Cancellation processing done for:", orderId);
return res.status(200).json({
  success: true,
  message: "Cancellation processed successfully",
});
  } catch (error) {
    console.error("❌ Cancellation email error:", error);
    return res.status(500).json({
      success: false,
      error: error?.message || "Unknown error",
    });
  }
};
export const updateBooking = async (req, res) => {
  const {
    orderId,
    fullName,
    userEmail,
    phone,
    city,
    state,
    pincode,
    travelDate,
    tripName,
    numberOfDays,  // ADD THIS
    total,
    breakdown = {},
    additionalTravelers = [],
    age,
    specialRequests,
  } = req.body;

  // Update in MongoDB
  try {
    await BookingModel.findOneAndUpdate(
      { orderId },
      { fullName, userEmail, phone, city, state, pincode, travelDate },
      { new: true }
    );
    console.log('✅ Booking updated in MongoDB:', orderId);
  } catch (err) {
    console.error('❌ MongoDB update error:', err);
  }

  const formatCurrency = (num) =>
    `₹${Number(num || 0).toLocaleString("en-IN")}`;

  const travelersListHtml = additionalTravelers.length > 0
    ? additionalTravelers.map((t, idx) => `
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
        </tr>`).join("")
    : `<tr><td colspan="3" align="center" style="padding:15px;color:#71717a;font-style:italic;">No additional explorers registered.</td></tr>`;

  const updatedHtml = `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 10px;font-family:Arial,sans-serif;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;background:#121212;border-radius:25px;overflow:hidden;border:1px solid #222;">
          <tr>
            <td align="center" style="background:#2563eb;padding:40px 20px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;letter-spacing:3px;text-transform:uppercase;">
                ✏️ Updated Booking Manifest
              </h1>
              <p style="margin:8px 0 0 0;color:#ffffff;font-size:12px;opacity:0.9;">
                ORDER ID: ${orderId}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 35px;color:#ffffff;">
              <h2 style="margin:0;font-size:22px;font-style:italic;">Namaste, ${fullName}</h2>
              <div style="margin-top:15px;margin-bottom:25px;">
                <span style="display:inline-block;margin:3px;padding:6px 12px;background:#1e1e1e;border-radius:20px;font-size:11px;color:#a1a1aa;">Age: ${age}</span>
                <span style="display:inline-block;margin:3px;padding:6px 12px;background:#1e1e1e;border-radius:20px;font-size:11px;color:#a1a1aa;">${city}, ${state}</span>
                <span style="display:inline-block;margin:3px;padding:6px 12px;background:#1e1e1e;border-radius:20px;font-size:11px;color:#a1a1aa;">PIN: ${pincode}</span>
              </div>
              <p style="color:#a1a1aa;font-size:14px;line-height:1.6;">
                Your booking details for <b style="color:#ffffff;">${tripName}</b> have been successfully updated.
              </p>
              <div style="margin-top:25px;background:#1e1e1e;border-radius:15px;padding:15px;border:1px solid #2563eb;">
                <p style="margin:0;color:#93c5fd;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;">What was updated</p>
                <p style="margin:8px 0 0 0;color:#a1a1aa;font-size:13px;">Name • Email • Phone • City • State • Pincode • Travel Date</p>
              </div>
              <div style="margin-top:35px;background:#1e1e1e;border-radius:20px;padding:25px;">
                <div style="color:#ea580c;font-size:11px;font-weight:bold;text-transform:uppercase;margin-bottom:15px;">Expedition Team</div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:12px;color:#ffffff;font-size:13px;"><b>1. ${fullName} (Lead)</b></td>
                    <td align="right" style="padding:12px;color:#71717a;font-size:11px;">${phone}</td>
                  </tr>
                  ${travelersListHtml}
                </table>
              </div>
              <div style="margin-top:35px;background:#1e1e1e;padding:30px;border-radius:25px;text-align:center;border:1px solid #2a2a2a;">
                <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;color:#a1a1aa;">
                  <tr><td align="left">Homestay Support (40%)</td><td align="right" style="color:#ffffff;">${formatCurrency(breakdown.homestay)}</td></tr>
                  <tr><td align="left">Local Guide & Expertise (25%)</td><td align="right" style="color:#ffffff;">${formatCurrency(breakdown.guide)}</td></tr>
                  <tr><td align="left">Farmers & Sustenance (20%)</td><td align="right" style="color:#ffffff;">${formatCurrency(breakdown.farmers)}</td></tr>
                  <tr><td align="left">Platform Fee (15%)</td><td align="right" style="color:#ffffff;">${formatCurrency(breakdown.platform)}</td></tr>
                </table>
                <div style="margin-top:25px;font-size:11px;color:#71717a;text-transform:uppercase;">Grand Total</div>
                <div style="font-size:36px;font-weight:bold;color:#ea580c;margin:10px 0;">${formatCurrency(total)}</div>
                <div style="font-size:11px;color:#71717a;text-transform:uppercase;">Departure: ${travelDate}</div>
<div style="font-size:11px;color:#71717a;text-transform:uppercase;margin-top:8px;">Duration: ${numberOfDays || 1} Day${(numberOfDays || 1) > 1 ? 's' : ''}</div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;

  try {
    await Promise.all([
      resend.emails.send({
        from: "Swadeshi Travels <onboarding@resend.dev>",
        to: userEmail,
        subject: `✏️ UPDATED BOOKING - ${orderId}`,
        html: updatedHtml,
      }),
      resend.emails.send({
        from: "Swadeshi Travels <onboarding@resend.dev>",
        to: "darklord8527789390@gmail.com",
        subject: `✏️ BOOKING UPDATED - ${orderId} - ${tripName}`,
        html: updatedHtml,
      }),
    ]);

    console.log("✅ Update emails sent for:", orderId);
    return res.status(200).json({ success: true, message: "Booking updated successfully" });
  } catch (error) {
    console.error("❌ Update email error:", error);
    return res.status(500).json({ success: false, error: error?.message });
  }
};