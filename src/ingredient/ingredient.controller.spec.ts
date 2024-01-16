import { Test, TestingModule } from '@nestjs/testing';
import { IngredientController } from './ingredient.controller';
import { Ingredient } from './ingredient.entity';
import { IngredientService } from './ingredient.service';

const testIngredient = new Ingredient();
Object.assign(testIngredient, { id: 1, name: 'Test Ingredient' });

describe('IngredientController', () => {
  let controller: IngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientController],
      providers: [
        {
          provide: IngredientService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(testIngredient),
            createOne: jest.fn().mockResolvedValue(testIngredient),
            searchByName: jest.fn().mockResolvedValue([testIngredient]),
          },
        },
      ],
    }).compile();

    controller = module.get<IngredientController>(IngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find one ingredient', async () => {
    expect(await controller.findOne(1)).toEqual(testIngredient);
  });

  it('should create an ingredient', async () => {
    const ingredient = new Ingredient();
    Object.assign(ingredient, testIngredient);
    expect(await controller.createOne(ingredient)).toEqual(testIngredient);
  });

  it('should search for ingredients by name', async () => {
    expect(await controller.searchByName('Test')).toEqual([testIngredient]);
  });
});
