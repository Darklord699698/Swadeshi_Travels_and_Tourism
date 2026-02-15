import nodemailer from 'nodemailer';

export const handleContactForm = async (req, res) => {
  const { name, email, message, type } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: 'darklord8527789390@gmail.com',
      pass: process.env.EMAIL_PASS 
    },
    tls: {
      // This helps bypass some network restrictions on Render
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: `"Bharat Trails Admin" <darklord8527789390@gmail.com>`,
    to: 'darklord8527789390@gmail.com',
    subject: `📩 ${type} Request: ${name}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background-color: #ea580c; padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px; text-transform: uppercase;">New Website Enquiry</h1>
        </div>

        <div style="padding: 30px; background-color: #ffffff;">
          <h3 style="color: #1e293b; margin-top: 0;">Explorer Details</h3>
          
          <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px;">
            <tr style="background-color: #f8fafc;">
              <td style="font-weight: bold; color: #64748b; width: 35%; border-bottom: 1px solid #edf2f7;">Full Name</td>
              <td style="color: #1e293b; border-bottom: 1px solid #edf2f7;">${name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #64748b; border-bottom: 1px solid #edf2f7;">Enquiry Type</td>
              <td style="border-bottom: 1px solid #edf2f7;">
                <span style="background-color: #fff7ed; color: #ea580c; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; border: 1px solid #ffedd5;">
                  ${type}
                </span>
              </td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="font-weight: bold; color: #64748b; border-bottom: 1px solid #edf2f7;">Email Address</td>
              <td style="color: #ea580c; font-weight: 500; border-bottom: 1px solid #edf2f7;">${email}</td>
            </tr>
          </table>

          <div style="margin-top: 30px;">
            <h3 style="color: #1e293b; margin-bottom: 10px;">Message</h3>
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 12px; color: #475569; line-height: 1.6; font-style: italic;">
              "${message}"
            </div>
          </div>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #edf2f7;">
          <p style="margin: 0; color: #94a3b8; font-size: 12px;">
            Sent via Bharat Trails Village Tourism Platform
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Styled enquiry sent!" });
  } catch (error) {
    console.error("Contact Mail Error:", error);
    res.status(500).json({ success: false });
  }
};