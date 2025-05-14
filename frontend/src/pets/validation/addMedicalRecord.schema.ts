import { z } from "zod";
import { MedicalRecordType } from "../interface/pet.interface";

export const addMedicalRecordSchema = z.object({
  type: z.nativeEnum(MedicalRecordType, { message: "Tipo inválido" }),
  description: z.string({ message: "Requerido" }),
  month: z.string(),

  year: z.string(),
});
