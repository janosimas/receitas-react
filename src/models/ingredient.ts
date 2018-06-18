export interface IngredientInterface { name: string, id: number }

export class Ingredient {
  public readonly name: string;
  public readonly id: number;
  constructor(json: IngredientInterface) {
    this.name = json.name;
    this.id = json.id;
  }
};
