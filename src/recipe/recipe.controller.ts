import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Recipe } from './recipe.entity';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.recipeService.findOne(id);
  }

  @Post()
  createOne(@Body() ingredient: Recipe) {
    return this.recipeService.createOne(ingredient);
  }
}
