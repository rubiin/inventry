import { Test, TestingModule } from '@nestjs/testing';
import { DamagedProductController } from './damaged-product.controller';
import { DamagedProductService } from './damaged-product.service';

describe('DamagedProductController', () => {
  let controller: DamagedProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DamagedProductController],
      providers: [DamagedProductService],
    }).compile();

    controller = module.get<DamagedProductController>(DamagedProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
