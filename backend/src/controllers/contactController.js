import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handleContactForm = async (req, res) => {
  const { name, email, message, type } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Bharat Trails <onboarding@resend.dev>', // Free tier uses this sender
      to: 'darklord8527789390@gmail.com', // Your admin email
      subject: `📩 ${type} Request: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 16px; overflow: hidden;">
          <div style="background-color: #ea580c; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase;">New Website Enquiry</h1>
          </div>
          <div style="padding: 30px;">
            <h3 style="color: #1e293b;">Explorer Details</h3>
            <table width="100%" cellpadding="10" style="border-collapse: collapse;">
              <tr style="background-color: #f8fafc;">
                <td><b>Name</b></td>
                <td>${name}</td>
              </tr>
              <tr>
                <td><b>Type</b></td>
                <td><span style="color: #ea580c; font-weight: bold;">${type}</span></td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td><b>Email</b></td>
                <td>${email}</td>
              </tr>
            </table>
            <div style="margin-top: 30px; background: #f1f5f9; padding: 20px; border-radius: 12px;">
              <p style="font-style: italic;">"${message}"</p>
            </div>
          </div>
        </div>
      `
    });

    res.status(200).json({ success: true, message: "Enquiry sent via Resend!" });
  } catch (error) {
    console.error("Resend API Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};