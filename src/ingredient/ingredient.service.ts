import { Injectable } from '@nestjs/common';
import { Ingredient } from './interfaces/ingredient.interface';

@Injectable()
export class IngredientService {
  private readonly ingredients: Ingredient[] = [];

  create(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  findAll(): Ingredient[] {
    return this.ingredients;
  }

  findOne(id: number): Ingredient {
    return this.ingredients.find((ingredient) => ingredient.id === id);
  }

  update(id: number, ingredient: Ingredient) {
    const index = this.ingredients.findIndex(
      (ingredient) => ingredient.id === id,
    );
    this.ingredients[index] = ingredient;
  }

  delete(id: number) {
    const index = this.ingredients.findIndex(
      (ingredient) => ingredient.id === id,
    );
    this.ingredients.splice(index, 1);
  }
}
