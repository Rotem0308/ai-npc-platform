import { Injectable, OnModuleInit } from '@nestjs/common';
import { GenerateContentResponse, GoogleGenAI } from '@google/genai';
import {
  responseSchemaJsonConfig,
  systemInstructionJson,
  systemInstructionScriptableObject,
} from '../config/gemini.config';
import replaceDynamicContentWithData from '../utils/replace-dynamic-content-with-data';
import { plainToInstance } from 'class-transformer';
import { FormDto } from 'src/dtos/form.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export class GeminiService implements OnModuleInit {
  private readonly ai: GoogleGenAI;
  private jsonSystemInstruction: string;
  private scriptableObjectSystemIstructions: string;
  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }
  onModuleInit() {
    this.initialJsonSystemIstructions();
    this.initialScriptableObjectSystemIstructions();
  }

  async generateJsonResponse(content: string) {
    const jsonResponse = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: content,
      config: {
        systemInstruction: this.jsonSystemInstruction,
        responseSchema: responseSchemaJsonConfig,
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    });

    const jsonString = jsonResponse.text;
    if (!jsonString)
      throw new Error('No JSON data was generated, check Gemini');

    const jsonObj = JSON.parse(jsonString);

    const jsonData = plainToInstance(FormDto, jsonObj);

    await validateOrReject(jsonData);

    return jsonData;
  }

  async generateScriptableObjectResponse(content: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: content,
      config: {
        systemInstruction: this.scriptableObjectSystemIstructions,
        temperature: 0.4,
        responseMimeType: 'text/plain',
      },
    });
    if (!response.text)
      throw new Error('No ScriptableObject data was generated, check Gemini');

    return response.text;
  }

  initialJsonSystemIstructions() {
    this.jsonSystemInstruction = systemInstructionJson;
  }
  initialScriptableObjectSystemIstructions() {
    const sysInsturction = systemInstructionScriptableObject;
    const sysInsturctionWithSchema = replaceDynamicContentWithData(
      sysInsturction,
      responseSchemaJsonConfig,
    );
    this.scriptableObjectSystemIstructions = sysInsturctionWithSchema;
  }
}
