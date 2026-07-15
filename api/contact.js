const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Portfolio Contact Message",
      text: `Name: ${name}

Email: ${email}

Message:
${message}`
    });

    return res.status(200).json({
      message: "Message Sent Successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to send message"
    });
  }
};