
const nodemailer = require('nodemailer');
const { logger } = require('./logger');
const { AppError } = require('./appError');

// Create mail transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection configuration
transporter.verify((error) => {
  if (error) {
    logger.error('Email service error:', error);
  } else {
    logger.info('Email service is ready to send messages');
  }
});

// Send email function
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });

    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('Error sending email:', error);
    throw new AppError('Failed to send email', 500);
  }
};

// Send OTP email
const sendOtpEmail = async (to, otp) => {
  const subject = 'Your Verification Code';
  const text = `Your verification code is: ${otp}. This code will expire in ${process.env.OTP_EXPIRY} minutes.`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #333; text-align: center;">Verification Code</h2>
      <p style="color: #666; font-size: 16px;">Please use the following code to verify your email address:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 8px; padding: 10px 20px; background-color: #f5f5f5; border-radius: 5px;">${otp}</span>
      </div>
      <p style="color: #666; font-size: 14px;">This code will expire in ${process.env.OTP_EXPIRY} minutes.</p>
      <p style="color: #666; font-size: 14px;">If you did not request this code, please ignore this email.</p>
    </div>
  `;

  return sendEmail({ to, subject, text, html });
};

module.exports = { sendEmail, sendOtpEmail };
