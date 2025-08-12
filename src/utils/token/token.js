import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
export const generateToken = ({ payload, secret, options } = {}) => {
  return jwt.sign({ ...payload, jti: nanoid()}, secret, options);
};
export const verifyToken = ({ token, secret } = {}) => {
  return jwt.verify(token, secret);
};
