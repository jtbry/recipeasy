import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientController } from './ingredient.controller';
import { Ingredient } from './ingredient.entity';
import { IngredientService } from './ingredient.service';

const testIngredient = new Ingredient();
Object.assign(testIngredient, { id: 1, name: 'Test Ingredient', recipes: [] });

describe('IngredientController', () => {
  let controller: IngredientController;
  let service: IngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientController],
      providers: [
        IngredientService,
        { provide: getRepositoryToken(Ingredient), useClass: Repository },
      ],
    }).compile();

    controller = module.get<IngredientController>(IngredientController);
    service = module.get<IngredientService>(IngredientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find one ingredient', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(testIngredient);
    expect(await controller.findOne(1)).toEqual(testIngredient);
  });

  it('should create an ingredient', async () => {
    jest.spyOn(service, 'createOne').mockResolvedValue(testIngredient);
    const ingredient = new Ingredient();
    Object.assign(ingredient, testIngredient);
    expect(await controller.createOne(ingredient)).toEqual(testIngredient);
  });

  it('should search for ingredients by name', async () => {
    jest.spyOn(service, 'searchByName').mockResolvedValue([testIngredient]);
    expect(await controller.searchByName('Test')).toEqual([testIngredient]);
  });
});
