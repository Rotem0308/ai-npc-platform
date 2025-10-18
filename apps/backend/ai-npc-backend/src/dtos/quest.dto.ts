import { IsString, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { DifficultyEnum } from 'src/enums/form.enum';

export class QuestDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
