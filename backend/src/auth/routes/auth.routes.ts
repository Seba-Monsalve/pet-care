import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authenticateToken } from "../../utils/index";

export const authRoutes = Router();
authRoutes.post("/login", AuthController.LogIn);
authRoutes.post("/signup", AuthController.SignUp);
authRoutes.post("/logout", AuthController.LogOut);
authRoutes.post("/update-user", authenticateToken, AuthController.UpdateUser);
