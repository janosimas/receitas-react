export interface IRecipeInterface {
  name: string,
  id: number
}

export class Recipe {
  public readonly name: string;
  public readonly id: number;
  constructor(json: IRecipeInterface) {
    this.name = json.name;
    this.id = json.id;
  }
};
