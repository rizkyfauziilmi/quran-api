import { Test, TestingModule } from '@nestjs/testing';
import { SurahService } from './surah.service';

describe('SurahService', () => {
  let service: SurahService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurahService],
    }).compile();

    service = module.get<SurahService>(SurahService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
