import { NpcDto } from 'src/dtos/npc.dto';
import { QuestDto } from 'src/dtos/quest.dto';

export interface JsonResponse {
  npc: NpcDto;
  quest: QuestDto;
}

export type ScriptableObjectResponse = string;

export interface GeminiResponse {
  jsonData: JsonResponse;
  scriptableObjectData: ScriptableObjectResponse;
}
