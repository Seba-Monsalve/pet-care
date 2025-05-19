import { url } from "inspector";
import { LostStatus } from "../../generated/prisma";
import prisma from "../../prisma-client";
import { hashPassword } from "../utils";
import { lostPetHistoryData } from "./data/lost-history.data";
import { medicalRecords } from "./data/medical-records.data";
import { pets } from "./data/pet.data";
import { users } from "./data/user.data";
import { vaccines } from "./data/vaccines.data";
import { Request, Response } from "express";

export class SeedController {
  static Seed = async (req: Request, res: Response) => {
    console.log("Seeding database...");

    await prisma.user.deleteMany({});
    await prisma.pet.deleteMany({});
    await prisma.vaccinationHistory.deleteMany({});
    await prisma.medicalRecord.deleteMany({});

    let userPromises = users.map(async (element) => {
      const { password, ...rest } = element;
      return prisma.user.create({
        data: {
          password: await hashPassword(element.password),
          ...rest,
        },
      });
    });
    await Promise.all(userPromises);

    const dbUsers = await prisma.user.findMany();

    let petPromises = pets.map(async (element) => {
      const res = await fetch('https://dog.ceo/api/breeds/image/random')
      return prisma.pet.create({
        data: {
          ownerId: dbUsers[Math.floor(Math.random() * users.length)].id,
          urlImage: await res.json().then((res) => res.message),
          ...element,
        },
      })
    }
    );
    await Promise.all(petPromises);

    const dbPets = await prisma.pet.findMany();

    let vaccs = vaccines.map((vac) => {
      return prisma.vaccinationHistory.create({
        data: {
          petId: dbPets[Math.floor(Math.random() * dbPets.length)].id,
          date: vac.date,
          nextDate: vac.nextDate,
          type: vac.type as any,
          status: vac.status,
        },
      });
    });
    await Promise.all(vaccs);

    let medicalRecordsPromises = medicalRecords.map((med) => {
      return prisma.medicalRecord.create({
        data: {
          petId: dbPets[Math.floor(Math.random() * dbPets.length)].id,
          ...med,
        },
      });
    });
    await Promise.all(medicalRecordsPromises);

    let lostHistoryPromises = lostPetHistoryData.map(async (lostRecord, i) => {

      const pet = dbPets[i].id

      await prisma.pet.update({
        data: { isLost: lostRecord.status == 'Perdido' }, where: { id: pet }
      })

      return prisma.lostPetHistory.create({
        data: {
          // petId: dbPets[Math.floor(Math.random() * dbPets.length)].id,
          // ...lostrecord
          petId: dbPets[i].id,
          lastSeen: lostRecord.lastSeen,
          location: lostRecord.location,
          description: lostRecord.description,
          reward: lostRecord.reward,
          status: LostStatus[lostRecord.status],
          foundAt: lostRecord.foundAt,
        },
      });
    });
    await Promise.all(lostHistoryPromises);

    res.status(200).json({ ...process.env, message: "Seeding completed" });
  };
}
