import { Test, TestingModule } from '@nestjs/testing';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

describe('AiController', () => {
  let controller: AiController;

  const mockAiConfig = {
    apiKey: 'MOCK_API_KEY',
    model: 'test-model',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiController],
      providers: [
        AiService,
        {
          // **Crucial: Match the token exactly as Nest sees it**
          provide: 'CONFIGURATION(ai)',
          useValue: mockAiConfig,
        },
      ],
    }).compile();

    controller = module.get<AiController>(AiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
