import { z } from "zod";
import { npcSchema } from "./npc.schema";
import { questSchema } from "./quest.schema";

export const npcGeneratorFormSchema = z.object({
  npc: npcSchema,
  quest: questSchema,
});

export type NpcGeneratorFormSchemaType = z.infer<typeof npcGeneratorFormSchema>;
