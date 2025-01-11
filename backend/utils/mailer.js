import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const fromEmail = process.env.FROM_EMAIL;

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: fromEmail,
      to,
      subject,
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Unable to send email.");
  }
};

// A reusable function to send OTP for password reset
const sendPasswordResetOTP = async (userEmail, otp) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f9; padding: 20px; border-radius: 8px; width: 100%; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="font-size: 24px; color: #4CAF50; text-align: center; margin-bottom: 20px;">Password Reset Request</h2>
        <p style="font-size: 16px; line-height: 1.5; color: #555;">Hello,</p>
        <p style="font-size: 16px; line-height: 1.5; color: #555;">We received a request to reset your password. Please use the OTP below to complete your password reset:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; padding: 15px 30px; color: #fff; background-color: #4CAF50; border-radius: 8px;">${otp}</span>
        </div>
        <p style="font-size: 16px; line-height: 1.5; color: #555;">If you did not request this, please ignore this message.</p>
        <p style="font-size: 16px; line-height: 1.5; color: #777;">This OTP will expire in 10 minutes for security reasons.</p>
        <hr style="border: 0; border-top: 1px solid #ccc; margin: 30px 0;">
        <p style="font-size: 14px; text-align: center; color: #999;">This email was sent by <span style="font-weight: bold; color: #4CAF50;">Noyco</span>. If you have any questions, feel free to contact our support team.</p>
      </div>
    </div>
  `;

  await sendEmail(userEmail, "Password Reset OTP", htmlContent);
};

// A reusable function to send promotional emails
const sendPromotionalEmail = async (userEmail, promotionContent) => {
  const htmlContent = `
    <h2>Special Promotion Just for You!</h2>
    <p>${promotionContent}</p>
    <p>Don't miss out on these great deals!</p>
  `;

  await sendEmail(userEmail, "Exciting Offers Just for You", htmlContent);
};

export { sendPasswordResetOTP, sendPromotionalEmail };
