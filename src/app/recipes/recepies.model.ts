import { IngredientsModel } from 'src/app/shared/ingredient.model';

export class RecipeModel {
  public id: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: IngredientsModel[];

  constructor(
    name: string,
    descr: string,
    imagePath: string,
    ingredients: IngredientsModel[]
  ) {
    this.id = String(parseInt(String(Math.random() * 1000)));
    this.name = name;
    this.description = descr;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
