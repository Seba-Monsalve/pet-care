import { NextFunction, Request, Response } from "express";
import prisma from "../../../prisma-client";
import { ERROR_MESSAGES, verifyToken } from "../../utils";

export class PetController {
  static getPets = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log("getPets");
    const decodedToken = (req as any).decodedToken;
    console.log(decodedToken);
    try {
      const pets = await prisma.pet.findMany({
        where: { ownerId: (decodedToken as any).payload },
        include: {
          owner: {
            select: {
              username: true,
              email: true,
              phone: true,
              address: true,
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

  static addPet = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log("addPet");
    const pet = req.body;
    const decodedToken = (req as any).decodedToken;

    try {
      const user = await prisma.user.findUnique({
        where: { id: (decodedToken as any).payload },
      });
      if (!user) {
        const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND.message);
        (error as any).status = ERROR_MESSAGES.USER_NOT_FOUND.code;
        throw error;
      }
      const newPet = await prisma.pet.create({
        data: {
          ...pet,
          ownerId: (decodedToken as any).payload,
          // owner: user,
        },
      });
      res.status(200).json(newPet);
    } catch (error) {
      next(error);
    }
  };

  static deletePet = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log("deletePet");
    const decodedToken = (req as any).decodedToken;

    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: { id: (decodedToken as any).payload },
      });
      if (!user) {
        const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND.message);
        (error as any).status = ERROR_MESSAGES.USER_NOT_FOUND.code;
        throw error;
      }

      const pet = await prisma.pet.findUnique({
        where: { id },
      });

      if (!pet) {
        const error = new Error(ERROR_MESSAGES.PET_NOT_FOUND.message);
        (error as any).status = ERROR_MESSAGES.PET_NOT_FOUND.code;
        throw error;
      }

      const deletedPet = await prisma.pet.update({
        where: { id: pet?.id },
        data: {
          isActive: false,
        },
      });

      res.status(200).json({ pet: deletedPet, ok: true });
    } catch (error) {
      next(error);
    }
  };

  static getPetById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log("getPetById");
    const { id } = req.params;
    const decodedToken = (req as any).decodedToken;

    try {
      const user = await prisma.user.findUnique({
        where: { id: (decodedToken as any).payload },
      });
      if (!user) {
        const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND.message);
        (error as any).status = ERROR_MESSAGES.USER_NOT_FOUND.code;
        throw error;
      }

      const pet = await prisma.pet.findUnique({
        where: { id },
        include: {
          owner: {
            select: {
              username: true,
              email: true,
              phone: true,
              address: true,
              isVet: true,
              urlImage: true,
            },
          },
          vaccinationHistory: {
            select: {
              id: true,
              type: true,
              date: true,
              nextDate: true,
              status: true,
            },
          },
          medicalRecord: {
            select: {
              id: true,
              type: true,
              date: true,
              description: true,
            },
          },
        },
      });

      if (!pet) {
        const error = new Error(ERROR_MESSAGES.PET_NOT_FOUND.message);
        (error as any).status = ERROR_MESSAGES.PET_NOT_FOUND.code;
        throw error;
      }

      res.status(200).json(pet);
    } catch (error) {
      next(error);
    }
  };

  static updatePet = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log("updatePet");
    const { id } = req.params;
    const decodedToken = (req as any).decodedToken;
    // const { titulo, descripcion, estado } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { id: (decodedToken as any).payload },
      });
      if (!user) {
        const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND.message);
        (error as any).status = ERROR_MESSAGES.USER_NOT_FOUND.code;
        throw error;
      }

      const pet = await prisma.pet.findUnique({
        where: { id },
        include: {
          medicalRecord: { select: { id: true } },
          vaccinationHistory: { select: { id: true } },
        },
      });
      if (!pet) {
        const error = new Error(ERROR_MESSAGES.PET_NOT_FOUND.message);
        (error as any).status = ERROR_MESSAGES.PET_NOT_FOUND.code;
        throw error;
      }

      await prisma.medicalRecord.deleteMany({
        where: {
          petId: pet?.id,
          NOT: {
            id: {
              in:
                req.body.medicalRecord?.map(
                  (record: any): Promise<void> => record?.id || ""
                ) || [],
            },
          },
        },
      });
      await prisma.vaccinationHistory.deleteMany({
        where: {
          petId: pet?.id,
          NOT: {
            id: {
              in:
                req.body.vaccinationHistory?.map(
                  (record: any): Promise<void> => record?.id || ""
                ) || [],
            },
          },
        },
      });
      const updatedpet = await prisma.pet.update({
        where: { id },
        data: {
          ...req.body,
          medicalRecord: {
            upsert: req.body.medicalRecord?.map((record: any) => ({
              where: { id: record.id || "" }, // Use an empty string or unique identifier
              update: {
                type: record.type,
                date: record.date,
                description: record.description,
              },
              create: {
                type: record.type,
                date: record.date,
                description: record.description,
              },
            })),
          },
          vaccinationHistory: {
            upsert: req.body.vaccinationHistory?.map((record: any) => ({
              where: { id: record.id || "" }, // Use an empty string or unique identifier
              update: {
                type: record.type,
                date: record.date,
                status: record.status,
                description: record.description,
              },
              create: {
                type: record.type,
                nextDate: record.nextDate,
                status: record.status,
                date: record.date,
                description: record.description,
              },
            })),
          },
        },
        include: {
          owner: {
            select: {
              username: true,
              email: true,
              phone: true,
              address: true,
            },
          },
          vaccinationHistory: {
            select: {
              id: true,
              type: true,
              date: true,
              nextDate: true,
              status: true,
            },
            orderBy: { createdAt: "desc" },
          },
          medicalRecord: {
            select: {
              id: true,
              type: true,
              date: true,
              description: true,
            },
            orderBy: { createdAt: "desc" },
          },
        },
      });
      res.status(200).json(updatedpet);
    } catch (error) {
      next(error);
    }
  };
}
