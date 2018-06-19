export interface IngredientInterface { name: string, id: number }

export class IngredientModel {
  public readonly name: string;
  public readonly id: number;
  constructor(json: IngredientInterface) {
    this.name = json.name;
    this.id = json.id;
  }
};
