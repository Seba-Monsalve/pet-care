import { NextFunction, Request, Response } from "express";
import prisma from "../../../prisma-client";

export class LostPetController {

    static getLostPets = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        console.log("getLostPets");
        try {
            const pets = await prisma.pet.findMany({
                where: {
                    lostPetHistory: {
                        some: {
                            status: "Perdido",
                        },
                    },
                },
                select: {
                    id: true,
                    name: true,
                    species: true,
                    breed: true,
                    urlImage: true,
                    isLost: true,
                    lostPetHistory: {
                        select: {
                            location: true,
                            status: true,
                            reward: true,
                            lastSeen: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            });
            res.status(200).json(pets);
        } catch (error) {
            next(error);
        }
    };


}
