import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './interfaces/ingredient.interface';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  create(@Body() ingredient: Ingredient) {
    return this.ingredientService.create(ingredient);
  }

  @Get()
  findAll(): Ingredient[] {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Ingredient {
    return this.ingredientService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() ingredient: Ingredient) {
    return this.ingredientService.update(+id, ingredient);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ingredientService.delete(+id);
  }
}
