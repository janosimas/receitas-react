export interface IRecipeInterface {
  name: string,
  id: number,
  ingredients: number[]
}

export class Recipe {
  public readonly name: string;
  public readonly id: number;
  public readonly ingredients: number[];
  constructor(json: IRecipeInterface) {
    this.name = json.name;
    this.id = json.id;
    this.ingredients = json.ingredients;
  }
};
