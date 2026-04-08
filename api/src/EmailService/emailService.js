import nodemailer from "nodemailer";
import axios from "axios";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g. smtp-relay.brevo.com
  port: process.env.SMTP_PORT, // 587
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.BREVO_API_KEY,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "PrepAI", email: "work.saurabhghodke@gmail.com" },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error("Email not sent");
  }
};
