import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.access_token;
  if (!token) {
    res.status(401).json({ error: "Token no proporcionado" });
    return;
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, decodedToken: any) => {
      if (err) {
        res.status(403).json({ error: "Token inválido" });
        return;
      }
      (req as any).decodedToken = decodedToken;
      next();
    }
  );
  return;
};
