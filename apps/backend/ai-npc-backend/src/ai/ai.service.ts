import { Inject, Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import type { ConfigType } from '@nestjs/config';
import AiConfig from './config/ai.config';
import { GeminiService } from './services/gemini.service';
import {
  buildJsonPrompt,
  buildScriptableObjectPrompt,
} from './utils/build-prompt';
import { FormDto } from 'src/dtos/form.dto';
import { GeminiResponse } from './types/response-from-model';

@Injectable()
export class AiService {
  private readonly geminiClient: GoogleGenAI;
  constructor(
    private readonly gemini: GeminiService,
    @Inject(AiConfig.KEY)
    private readonly aiConfiguration: ConfigType<typeof AiConfig>,
  ) {
    this.geminiClient = new GoogleGenAI({
      apiKey: aiConfiguration.apiKey,
    });
  }

  async main(userPrompt: FormDto): Promise<GeminiResponse> {
    const jsonPrompt = buildJsonPrompt(userPrompt);
    const jsonData = await this.gemini.generateJsonResponse(jsonPrompt);

    if (!jsonData) throw new Error('no json data was generated,check gemini');

    const scriptableObjectPrompt = buildScriptableObjectPrompt(jsonData);
    const scriptableObjectData =
      await this.gemini.generateScriptableObjectResponse(
        scriptableObjectPrompt,
      );
    const response: GeminiResponse = {
      jsonData,
      scriptableObjectData,
    };
    return response;
  }
}
