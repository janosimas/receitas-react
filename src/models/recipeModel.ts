import * as R from 'ramda';
import { InterfaceIngredientModel } from "./ingredientModel";

export interface InterfaceRecipeModel {
  name: string,
  id?: number,
  ingredients: InterfaceIngredientModel[]
}

export const getRecipeById = async (id: number) : Promise<InterfaceRecipeModel | undefined> => {
  const res = await fetch('http://localhost:8080/recipe/list');
  const json = await res.json();
  if(!R.isNil(json.error) && !R.isEmpty(res)) {
    return res[0];
  }

  return undefined;
}
