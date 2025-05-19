import { NextFunction, Request, Response } from "express";
import prisma from "../../../prisma-client";
import { hashPassword, verifyPassword } from "../../utils/bcrypt.util";
import { ERROR_MESSAGES, generateToken, verifyToken } from "../../utils/index";

export class AuthController {
  static SignUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log("SignUp");
    const { username, email, password } = req.body;

    try {
      if (
        username == undefined ||
        email == undefined ||
        password == undefined
      ) {
        const error = new Error(ERROR_MESSAGES.FIELDS_REQUIRED.message);
        (error as any).status = ERROR_MESSAGES.FIELDS_REQUIRED.code;
        throw error;
      }

      // const emailExists = await prisma.user.findUnique({ where: { email } });
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });
      if (!!emailExists) {
        const error = new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS.message);
        (error as any).status = ERROR_MESSAGES.USER_ALREADY_EXISTS.code;
        throw error;
      }

      const usernameExists = await prisma.user.findUnique({
        where: { email },
      });
      if (!!usernameExists) {
        const error = new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS.message);
        (error as any).status = ERROR_MESSAGES.USER_ALREADY_EXISTS.code;
        throw error;
      }

      const hashedPassword = await hashPassword(password);
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      if (newUser) {
        const token = generateToken(newUser.id);
        res.cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }

      res.status(200).json({
        user: newUser,
        message: "User created successfully",
        error: null,
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  };

  static LogIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log("LogIn");
    const { email, password } = req.body;

    try {
      if (email == undefined || password == undefined) {
        const error = new Error(ERROR_MESSAGES.FIELDS_REQUIRED.message);
        (error as any).status = ERROR_MESSAGES.FIELDS_REQUIRED.code;
        throw error;
      }

      const userExists = await prisma.user.findUnique({ where: { email } });
      if (!userExists) {
        const error = new Error(ERROR_MESSAGES.CREDENTIALS_INCORRECT.message);
        (error as any).status = ERROR_MESSAGES.CREDENTIALS_INCORRECT.code;
        throw error;
      }

      const isPasswordValid = await verifyPassword(
        password,
        userExists!.password!
      );
      if (!isPasswordValid) {
        const error = new Error(ERROR_MESSAGES.CREDENTIALS_INCORRECT.message);
        (error as any).status = ERROR_MESSAGES.CREDENTIALS_INCORRECT.code;
        throw error;
      }

      const token = generateToken(userExists!.id);

      const { password: pass, ...rest } = userExists!;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 1000, // 1 hour
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        })
        .status(200)
        .json({
          //! COMENTAAR
          token,
          user: rest,
          ok: true,
          message: "User logged in successfully",
        });
    } catch (error) {
      next(error);
    }
  };

  static GetUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log("GetUser");
    const token = req.cookies.access_token;
    try {
      if (!token) {
        const error = new Error(ERROR_MESSAGES.TOKEN_NOT_PROVIDED.message);
        (error as any).status = ERROR_MESSAGES.TOKEN_NOT_PROVIDED.code;
        throw error;
      }

      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        const error = new Error(ERROR_MESSAGES.UNAUTHORIZED.message);
        (error as any).status = ERROR_MESSAGES.UNAUTHORIZED.code;
        throw error;
      }
      const user = await prisma.user.findUnique({
        where: { id: (decodedToken as any).id },
      });
      if (!user) {
        const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND.message);
        (error as any).status = ERROR_MESSAGES.USER_NOT_FOUND.code;
        throw error;
      }

      res.status(200).json({ user, ok: true });
    } catch (error) {
      next(error);
    }
  };

  static LogOut = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log("LogOut");
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logged out successfully", ok: true });
  };

  static UpdateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = (req as any).decodedToken.payload;
    // const { titulo, descripcion, estado } = req.body;


    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND.message);
        (error as any).status = ERROR_MESSAGES.USER_NOT_FOUND.code;
        throw error;
      }

      if (req.body.password) {
        const hashedPassword = await hashPassword(req.body.password);
        req.body.password = hashedPassword;
      }

      const updateUser = await prisma.user.update({
        where: { id },
        data: {
          ...req.body,
        }
      });

      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  };
}
