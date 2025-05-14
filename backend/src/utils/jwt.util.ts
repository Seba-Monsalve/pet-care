import jsonwebtoken from "jsonwebtoken";

export const generateToken = (payload: any) => {
  return jsonwebtoken.sign({ payload }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET!);
};
