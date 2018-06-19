export interface InterfaceRecipeModel {
  name: string,
  id: number,
  ingredients: number[]
}

export class RecipeModel {
  public readonly name: string;
  public readonly id: number;
  public readonly ingredients: number[];
  constructor(json: InterfaceRecipeModel) {
    this.name = json.name;
    this.id = json.id;
    this.ingredients = json.ingredients;
  }
};
