import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { IngredientService } from './ingredient.service';

describe('IngredientService', () => {
  let service: IngredientService;
  let repo: Repository<Ingredient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientService,
        { provide: getRepositoryToken(Ingredient), useClass: Repository },
      ],
    }).compile();

    service = module.get<IngredientService>(IngredientService);
    repo = module.get<Repository<Ingredient>>(getRepositoryToken(Ingredient));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one ingredient', async () => {
    const testIngredient = { id: 1, name: 'Test Ingredient' };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(testIngredient as any);
    expect(await service.findOne(1)).toEqual(testIngredient);
  });

  it('should create an ingredient', async () => {
    const testIngredient = { id: 1, name: 'Test Ingredient' };
    jest.spyOn(repo, 'save').mockResolvedValue(testIngredient as any);
    expect(await service.createOne(testIngredient)).toEqual(testIngredient);
  });
});
