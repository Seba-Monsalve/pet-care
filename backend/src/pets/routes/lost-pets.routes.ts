import { Router } from "express";
import { LostPetController } from "../controllers/lost-pets.controller";

export const lostPetRouter = Router();

lostPetRouter.get("/", LostPetController.getLostPets);
