import { z } from "zod";

export const addLostNoticeSchema = z.object({
  lastSeen: z.union([z.date(), z.string()], {
    required_error: "Se requiere una fecha.",
  }),
  description: z.string().min(1, {
    message: "Se requiere una descripción.",
  }),
  reward: z.union([z.string(), z.number()]).optional(),
  location: z.string().min(1, {
    message: "Se requiere una ubicación.",
  }),
});
