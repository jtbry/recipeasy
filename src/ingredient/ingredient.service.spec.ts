import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { IngredientService } from './ingredient.service';

const testIngredient = new Ingredient();
Object.assign(testIngredient, { id: 1, name: 'Test Ingredient', recipes: [] });

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
    jest.spyOn(repo, 'findOne').mockResolvedValue(testIngredient);
    expect(await service.findOne(1)).toEqual(testIngredient);
  });

  it('should create an ingredient', async () => {
    jest.spyOn(repo, 'save').mockResolvedValue(testIngredient);
    expect(await service.createOne(testIngredient)).toEqual(testIngredient);
  });

  it('should search for ingredients by name', async () => {
    jest.spyOn(repo, 'find').mockResolvedValue([testIngredient]);
    expect(await service.searchByName('Test')).toEqual([testIngredient]);
  });
});
