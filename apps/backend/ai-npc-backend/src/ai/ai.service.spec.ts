import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';

describe('AiService', () => {
  let service: AiService;

  const mockAiConfig = {
    // Provide mock values for any properties the AiService uses
    apiKey: 'MOCK_API_KEY',
    model: 'test-model',
    // ... other config properties
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          // **Crucial: Match the token exactly as Nest sees it**
          provide: 'CONFIGURATION(ai)',
          useValue: mockAiConfig,
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
