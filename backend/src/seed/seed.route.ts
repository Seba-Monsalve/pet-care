import { Router } from "express";
import { SeedController } from "./seed.contoller";

export const seedRoutes = Router();
seedRoutes.get("/", SeedController.Seed);
