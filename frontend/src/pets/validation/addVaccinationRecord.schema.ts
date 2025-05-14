import { z } from "zod";
import { VaccinationRecordType } from "../interface/pet.interface";

export const addVaccinationRecord = z.object({
  type: z.nativeEnum(VaccinationRecordType, { message: "Tipo inválido" }),
  month: z.string(),
  year: z.string(),
  description: z.string({ message: "Requerido" }),
});
