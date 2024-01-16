import { Test, TestingModule } from '@nestjs/testing';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './interfaces/ingredient.interface';

describe('IngredientService', () => {
  let service: IngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientService],
    }).compile();

    service = module.get<IngredientService>(IngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an ingredient', () => {
    const ingredient: Ingredient = { id: 1, name: 'Test Ingredient' };
    service.create(ingredient);
    expect(service.findAll()).toContain(ingredient);
  });

  it('should find all ingredients', () => {
    expect(service.findAll()).toBeInstanceOf(Array);
  });

  it('should find one ingredient', () => {
    const ingredient: Ingredient = { id: 1, name: 'Test Ingredient' };
    service.create(ingredient);
    expect(service.findOne(1)).toEqual(ingredient);
  });

  it('should update an ingredient', () => {
    const ingredient: Ingredient = { id: 1, name: 'Test Ingredient' };
    service.create(ingredient);
    const updatedIngredient: Ingredient = { id: 1, name: 'Updated Ingredient' };
    service.update(1, updatedIngredient);
    expect(service.findOne(1)).toEqual(updatedIngredient);
  });

  it('should delete an ingredient', () => {
    const ingredient: Ingredient = { id: 1, name: 'Test Ingredient' };
    service.create(ingredient);
    service.delete(1);
    expect(service.findOne(1)).toBeUndefined();
  });
});
