import { genSalt, hashSync, compareSync } from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  decryptedPassword: string
) => {
  return compareSync(password, decryptedPassword);
};
