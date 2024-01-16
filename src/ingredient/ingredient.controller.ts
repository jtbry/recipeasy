import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Ingredient } from './ingredient.entity';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  createOne(@Body() ingredient: Ingredient) {
    return this.ingredientService.createOne(ingredient);
  }

  @Get('search')
  searchByName(@Query('name') name: string) {
    return this.ingredientService.searchByName(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const ingredient = await this.ingredientService.findOne(id);
    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }
    return ingredient;
  }
}
