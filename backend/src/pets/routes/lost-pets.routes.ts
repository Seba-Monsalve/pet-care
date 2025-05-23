import { Router } from "express";
import { LostPetController } from "../controllers/lost-pets.controller";

export const lostPetRouter = Router();

lostPetRouter.get("/", LostPetController.getLostPets);
lostPetRouter.get("/:id", LostPetController.getLostPetById);
lostPetRouter.post("/add", LostPetController.createLostPetNotice);
lostPetRouter.post("/foundPet/:id", LostPetController.foundPet);
