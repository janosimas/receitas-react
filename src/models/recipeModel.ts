import { InterfaceIngredientModel } from "./ingredientModel";

export interface InterfaceRecipeModel {
  name: string,
  id?: number,
  ingredients: InterfaceIngredientModel[]
}
