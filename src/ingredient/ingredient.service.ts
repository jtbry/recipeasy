import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  findOne(id: number): Promise<Ingredient> {
    return this.ingredientRepository.findOne({
      where: { id },
      relations: ['recipes'],
    });
  }

  createOne(ingredient: Ingredient): Promise<Ingredient> {
    return this.ingredientRepository.save(ingredient);
  }

  searchByName(name: string): Promise<Ingredient[]> {
    return this.ingredientRepository.find({
      where: { name: Like(`%${name}%`) },
    });
  }
}
