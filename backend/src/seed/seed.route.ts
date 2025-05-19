import { Router } from "express";
import { SeedController } from "./seed.controller";

export const seedRoutes = Router();
seedRoutes.get("/", SeedController.Seed);
