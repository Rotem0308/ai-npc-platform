import { IsString, IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { DialogueDto } from './dialog.dto';

export class NpcDto {
  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsString()
  personality: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DialogueDto)
  dialogue: DialogueDto[];
}
