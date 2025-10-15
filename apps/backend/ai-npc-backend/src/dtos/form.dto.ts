import { NpcDto } from './npc.dto';
import { QuestDto } from './quest.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FormDto {
  @ValidateNested()
  @Type(() => NpcDto)
  npc: NpcDto;

  @ValidateNested()
  @Type(() => QuestDto)
  quest: QuestDto;
}
