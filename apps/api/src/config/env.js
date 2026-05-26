import "dotenv/config";

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_URL_UNPOOLED: process.env.DATABASE_URL_UNPOOLED,
  JWT_SECRET: process.env.JWT_SECRET || "keshav-linklytics",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || "10",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  APP_URL: process.env.APP_URL || "http://localhost:3001",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  RESEND_API_KEY:
    process.env.RESEND_API_KEY || "re_YcoFtdnT_L3Y2RjmNV9XuuKWWkEQYD2s2",

  EMAIL_FROM: process.env.EMAIL_FROM || "noreply@linklytics.com",
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3001"),
  HOST: process.env.HOST || "0.0.0.0",
  UPSTASH_REDIS_REST_URL:
    process.env.UPSTASH_REDIS_REST_URL ||
    "https://oriented-bobcat-136661.upstash.io",
  UPSTASH_REDIS_REST_TOKEN:
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    "gQAAAAAAAhXVAAIgcDFiMWFhOWU3ZDIwZGQ0ZWYyOGQ3YWYzNGI1YWI1YTQxZA",
};
