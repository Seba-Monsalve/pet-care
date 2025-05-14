import { Router } from "express";
import { PetController } from "../controllers/pet.controller";

export const petRoutes = Router();

petRoutes.get("/", PetController.getPets);
petRoutes.get("/:id", PetController.getPetById);
petRoutes.post("/add", PetController.addPet);
petRoutes.delete("/delete/:id", PetController.deletePet);
petRoutes.patch("/update/:id", PetController.updatePet);
