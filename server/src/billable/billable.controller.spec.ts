import { Test, TestingModule } from '@nestjs/testing';
import { BillableController } from './billable.controller';

describe('BillableController', () => {
  let controller: BillableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillableController],
    }).compile();

    controller = module.get<BillableController>(BillableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
