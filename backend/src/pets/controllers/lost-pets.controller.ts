import { NextFunction, Request, Response } from "express";
import prisma from "../../../prisma-client";
import { ERROR_MESSAGES } from "../../utils";
import { config } from "dotenv";

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

    static getLostPetById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        console.log("getLostPetById");
        const { id } = req.params;
        try {
            const pet = await prisma.pet.findUnique({
                where: { id },
                include: {
                    owner: {
                        select: {
                            username: true,
                            id: true,
                            email: true,
                            phone: true,
                            address: true,
                            urlImage: true,
                        },
                    },
                    lostPetHistory: {
                        select: {
                            id: true,
                            status: true,
                            location: true,
                            reward: true,
                            lastSeen: true,
                            description: true,
                            foundAt: true,
                        }
                    }
                }
            })

            if (!pet) {
                const error = new Error(ERROR_MESSAGES.PET_NOT_FOUND.message);
                (error as any).status = ERROR_MESSAGES.PET_NOT_FOUND.code;
                throw error;
            }
            console.log(pet);
            res.status(200).json(pet);
        } catch (error) {
            next(error);
        }
    };

    static createLostPetNotice = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        console.log("createLostPetNotice");
        try {

            const { pet,
                ...rest
            } = req.body



            const lostNotice = await prisma.lostPetHistory.findFirst({
                where: {
                    petId: pet.id,
                    status: "Perdido",
                },
            });

            if (lostNotice) {
                console.log('updateando el lost notice');
                const newLostNotice = await prisma.$transaction(async (tx) => {
                    const updatedLostNotice = await prisma.lostPetHistory.update({
                        where: { id: lostNotice.id },
                        data: {
                            ...rest
                        }
                    });
                    await tx.pet.update({
                        where: { id: pet.id },
                        data: {
                            isLost: true,
                        }
                    });
                    res.status(200).json(updatedLostNotice);
                }
                )
            }
            else {

                const newLostNotice = await prisma.$transaction(async (tx) => {
                    const createdNotice = await tx.lostPetHistory.create({
                        data: {
                            petId: pet.id,
                            ...rest,
                            status: "Perdido",
                        }
                    });
                    await tx.pet.update({
                        where: { id: pet.id },
                        data: {
                            isLost: true,
                        }
                    });
                    return createdNotice;
                },);

                res.status(200).json(newLostNotice);
            }
        } catch (error) {
            next(error);
        }
    };

    static foundPet = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        console.log("foundPet");
        console.log(req.body);
        const { pet } = req.body
        try {

            const toogleLostRecord = await prisma.$transaction(async (tx) => {
                await tx.pet.update({
                    where: { id: pet.id },
                    data: {
                        isLost: false,
                    }
                });


                const lostPetRecord = pet.lostPetHistory.find(e => e.status === "Perdido");

                console.log(lostPetRecord);
                const updatedLostNotice = await tx.lostPetHistory.update({
                    where: { id: lostPetRecord.id },
                    data: {
                        status: "Encontrado",
                        foundAt: new Date(),
                    }
                });
                res.status(200).json(updatedLostNotice);
            }
            )
        } catch (error) {
            next(error);
        }
    };
}
