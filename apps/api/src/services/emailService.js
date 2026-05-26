import { Resend } from "resend";
import { env } from "../config/env.js";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationEmail(to, token) {
  const url = `${env.FRONTEND_URL}/verify-email?token=${token}`;
  await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject: "verify your email - linklytics",
    html: `
        <h2>Welcome to Linklytics!</h2>
        <p>Click below to verify your email:</p>
        <a href="${url}" style="background:#4f63ff;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;">
        Verify Email
        </a>
        <p>This link expires in 24 hours.</p>
        `,
  });
}

export async function sendPasswordResetEmail(to, token) {
  const url = `${env.FRONTEND_URL}/reset-password?token=${token}`;
  await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject: "Reset your password - Linklytics",
    html: `
      <h2>Password Reset</h2>
      <p>Click below to reset your password:</p>
      <a href="${url}" style="background:#4f63ff;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;">
        Reset Password
      </a>
      <p>Expires in 1 hour. Ignore this if you didn't request it.</p>
    `,
  });
}
