import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handleContactForm = async (req, res) => {
  try {
    const { name, email, message, type } = req.body;

    if (!name || !email || !message || !type) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const response = await resend.emails.send({
      from: "Bharat Trails <onboarding@resend.dev>",
      to: "darklord8527789390@gmail.com",
      reply_to: email,
      subject: `📩 ${type} Request from ${name}`,
      html: `
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #020617; padding: 40px 10px;">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden;">
                
                <tr>
                  <td align="center" style="background-color: #ea580c; padding: 40px 20px;">
                    <h1 style="margin: 0; color: #ffffff; font-family: Arial, sans-serif; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">
                      New Website Enquiry
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 40px 30px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 20px;">
                          <span style="background-color: #fff7ed; color: #ea580c; padding: 5px 15px; border-radius: 50px; font-family: Arial; font-size: 11px; font-weight: bold; border: 1px solid #ffedd5;">
                            ${type.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial; font-size: 13px; color: #94a3b8; font-weight: bold;">EXPLORER</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0 20px 0; font-family: Arial; font-size: 18px; color: #1e293b; font-weight: bold;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #f1f5f9; font-family: Arial; font-size: 13px; color: #94a3b8; font-weight: bold;">CONTACT EMAIL</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0 30px 0; font-family: Arial; font-size: 18px; color: #ea580c; font-weight: bold;">${email}</td>
                      </tr>

                      <tr>
                        <td style="background-color: #f8fafc; padding: 25px; border-left: 4px solid #ea580c; border-radius: 10px;">
                          <div style="font-family: Arial; font-size: 11px; color: #94a3b8; font-weight: bold; margin-bottom: 10px;">MESSAGE</div>
                          <div style="font-family: Arial; font-size: 15px; color: #475569; line-height: 1.6; font-style: italic;">
                            "${message}"
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td align="center" style="padding-top: 40px;">
                          <a href="mailto:${email}" style="background-color: #ea580c; color: #ffffff; padding: 15px 35px; border-radius: 10px; text-decoration: none; font-family: Arial; font-weight: bold; font-size: 16px; display: inline-block;">
                            Reply to Explorer
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding: 20px; background-color: #fcfcfc; border-top: 1px solid #f1f5f9; font-family: Arial; font-size: 10px; color: #94a3b8; letter-spacing: 1px;">
                    SENT VIA BHARAT TRAILS ADMIN DASHBOARD
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      `,
    });

    return res.status(200).json({ success: true, message: "Bulletproof enquiry sent!" });
  } catch (error) {
    console.error("❌ Resend Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};