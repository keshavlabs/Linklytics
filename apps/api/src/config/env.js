import "dotenv/config";

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_URL_UNPOOLED: process.env.DATABASE_URL_UNPOOLED,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || "10",
  REDIS_URL: process.env.REDIS_URL,
  APP_URL: process.env.APP_URL || "http://localhost:3001",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  RESEND_API_KEY: process.env.RESEND_API_KEY,

  EMAIL_FROM: process.env.EMAIL_FROM || "noreply@linklytics.com",
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3001"),
  HOST: process.env.HOST || "0.0.0.0",
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
};
