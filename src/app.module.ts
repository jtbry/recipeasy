import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IngredientService } from './ingredient/ingredient.service';
import { IngredientController } from './ingredient/ingredient.controller';

@Module({
  imports: [],
  controllers: [AppController, IngredientController],
  providers: [IngredientService],
})
export class AppModule {}
