import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export const authRoutes = Router();
authRoutes.post("/login", AuthController.LogIn);
authRoutes.post("/signup", AuthController.SignUp);
authRoutes.post("/logout", AuthController.LogOut);
