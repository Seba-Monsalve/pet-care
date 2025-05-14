import { z } from "zod";

export const addPetValidation = z.object({
  name: z.string().min(1, { message: "Requerido" }),
  species: z.string({ message: "Requerido" }),

  breed: z.string({ message: "Requerido" }),
  sex: z.string({ message: "Requerido" }),
  color: z.string().optional(),
  microchip: z.string().optional(),

  urlImage: z.any().optional(),
  weight: z
    .string()
    .min(1, { message: "Requerido" })
    .max(1000, { message: "El peso no puede ser mayor a 1000 kg" }),
  sterilized: z.boolean(),
  dob_month: z.string({
    message: "Requerido",
  }),
  dob_year: z.string({
    message: "Requerido",
  }),
});
