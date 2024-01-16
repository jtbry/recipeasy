import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { RecipeService } from './recipe.service';

const testRecipe = new Recipe();
Object.assign(testRecipe, {
  id: 1,
  name: 'Test Recipe',
  link: 'https://www.test.com',
});

describe('RecipeService', () => {
  let service: RecipeService;
  let repo: Repository<Recipe>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        { provide: getRepositoryToken(Recipe), useClass: Repository },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    repo = module.get<Repository<Recipe>>(getRepositoryToken(Recipe));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one recipe', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(testRecipe);
    const recipe = await service.findOne(1);
    expect(recipe).toEqual(testRecipe);
  });

  it('should create a recipe', async () => {
    jest.spyOn(repo, 'save').mockResolvedValue(testRecipe);
    const recipe = await service.createOne(testRecipe);
    expect(recipe).toEqual(testRecipe);
  });
});
