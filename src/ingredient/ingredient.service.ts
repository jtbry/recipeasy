import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  findOne(id: number): Promise<Ingredient> {
    return this.ingredientRepository.findOneBy({ id });
  }

  createOne(ingredient: Ingredient): Promise<Ingredient> {
    return this.ingredientRepository.save(ingredient);
  }
}
