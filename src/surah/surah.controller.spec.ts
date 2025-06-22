import { Test, TestingModule } from '@nestjs/testing';
import { SurahController } from './surah.controller';

describe('SurahController', () => {
  let controller: SurahController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurahController],
    }).compile();

    controller = module.get<SurahController>(SurahController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
