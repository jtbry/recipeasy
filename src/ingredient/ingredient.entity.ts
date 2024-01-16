import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Recipe, (recipe) => recipe.ingredients)
  recipes: Recipe[];
}
