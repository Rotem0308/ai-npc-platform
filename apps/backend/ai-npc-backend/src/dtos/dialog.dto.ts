import { IsInt, IsString } from 'class-validator';

export class DialogueDto {
  @IsInt()
  id: number;

  @IsString()
  text: string;
}
