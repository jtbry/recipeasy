import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeController } from './recipe.controller';
import { Recipe } from './recipe.entity';
import { RecipeService } from './recipe.service';

const testRecipe = new Recipe();
Object.assign(testRecipe, {
  id: 1,
  name: 'Test Recipe',
  link: 'https://www.test.com',
});

describe('RecipeController', () => {
  let controller: RecipeController;
  let service: RecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        RecipeService,
        { provide: getRepositoryToken(Recipe), useClass: Repository },
      ],
    }).compile();

    controller = module.get<RecipeController>(RecipeController);
    service = module.get<RecipeService>(RecipeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find one recipe', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(testRecipe);
    expect(await controller.findOne(1)).toEqual(testRecipe);
  });

  it('should create a recipe', async () => {
    jest.spyOn(service, 'createOne').mockResolvedValue(testRecipe);
    expect(await controller.createOne(testRecipe)).toEqual(testRecipe);
  });

  it('should find all recipes', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([testRecipe]);
    expect(await controller.findAll()).toEqual([testRecipe]);
  });
});
