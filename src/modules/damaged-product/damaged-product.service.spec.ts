import { Test, TestingModule } from '@nestjs/testing';
import { DamagedProductService } from './damaged-product.service';

describe('DamagedProductService', () => {
  let service: DamagedProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DamagedProductService],
    }).compile();

    service = module.get<DamagedProductService>(DamagedProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
