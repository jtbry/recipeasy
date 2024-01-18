import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }
  findOne(id: number): Promise<Recipe> {
    return this.recipeRepository.findOne({
      where: { id },
      relations: ['ingredients'],
    });
  }

  createOne(recipe: Recipe): Promise<Recipe> {
    return this.recipeRepository.save(recipe);
  }
}
