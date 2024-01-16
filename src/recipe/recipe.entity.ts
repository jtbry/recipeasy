import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from '..//ingredient/ingredient.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.recipes)
  @JoinTable()
  ingredients: Ingredient[];
}
