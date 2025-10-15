import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { FormDto } from 'src/dtos/form.dto';

@Controller('ai')
export class AiController {
  constructor(private AiService: AiService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async Content(@Body() userPrompt: FormDto) {
    console.log(userPrompt);
    return await this.AiService.main(userPrompt);
  }
}
