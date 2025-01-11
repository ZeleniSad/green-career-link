import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import { EmailTemplate } from "../types/interfaces";
import logger from "@/lib/logger";
import SMTPTransport from "nodemailer/lib/smtp-transport";

dotenv.config();

const smtpOptions: SMTPTransport.Options = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

const transporter = nodemailer.createTransport(smtpOptions);

const VERIFICATION_EMAIL_TEMPLATE = (name: string, verificationLink: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            color: #555555;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff !important;
            background-color: #03624C;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #024737;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #aaaaaa;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Verify Your Email Address</h1>
        <p>Dear ${name},</p>
        <p>Thank you for registering with Green Career Link. To complete your registration, please verify your email address by clicking the button below:</p>
        <a href="${verificationLink}" class="button">Verify Email</a>
        <p>If you did not create an account, no further action is required.</p>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Green Career Link. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;

async function sendEmail({ to, subject, html }: EmailTemplate) {
  const mailOptions = {
    from: `"Green Career Link" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    logger.error("Error sending email:", error);
    throw error;
  }
}

export const sendEmailVerification = async (to: string, verificationLink: string, name: string) => {
  const subject = "Verify Your Email Address";
  const html = VERIFICATION_EMAIL_TEMPLATE(name, verificationLink);

  return sendEmail({ to, subject, html });
};
