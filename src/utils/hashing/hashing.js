import bcrypt from "bcrypt";
export const hashData = async ({ plainText, saltRounds } = {}) => {
  return await bcrypt.hash(plainText, Number(saltRounds) || 10);
}
export const compareData = async ({ plainText, hash } = {}) => {
  return await bcrypt.compare(plainText, hash);
}