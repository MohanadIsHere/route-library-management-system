import dotenv from "dotenv";
import path from "node:path";
import process from "node:process";
dotenv.config({ path: path.resolve("./.env.dev.local") });

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_SECRET_ADMIN,
  JWT_REFRESH_TOKEN_SECRET_ADMIN,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  ENCRYPTION_KEY,
  SALT_ROUNDS,
} = process.env;
