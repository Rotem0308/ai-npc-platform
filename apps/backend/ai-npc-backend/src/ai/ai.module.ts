import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ConfigModule } from '@nestjs/config';
import AiConfig from './config/ai.config';
import { GeminiService } from './services/gemini.service';

@Module({
  imports: [ConfigModule.forFeature(AiConfig)],
  providers: [AiService, GeminiService],
  controllers: [AiController],
})
export class AiModule {}
