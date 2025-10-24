import { z } from "zod";

export const npcSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  personality: z.string().min(1, "Personality is required"),
});
