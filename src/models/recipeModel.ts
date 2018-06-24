import * as R from 'ramda';
import { InterfaceIngredientModel } from "./ingredientModel";

export interface InterfaceRecipeModel {
  id?: number,
  name: string,
  cookingMethod?: string;
  description?: string;
  ingredients: InterfaceIngredientModel[]
}

export const getRecipeById = async (id: number): Promise<InterfaceRecipeModel | undefined> => {
  // TODO: use a better route
  const res = await fetch('http://localhost:8080/recipe/list');
  const json = await res.json();
  if (!R.isEmpty(json) && R.isNil(json.error)) {
    for (const recipe of json) {
      if (recipe.id === Number(id)) {
        if (R.isNil(recipe.ingredients)) {
          recipe.ingredients = [];
        }
        return recipe;
      }
    }
  }

  return undefined;
}

export const saveRecipe = async (recipe: InterfaceRecipeModel) => {
  fetch('http://localhost:8080/recipe', {
    body: JSON.stringify({
      ...recipe
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
  })
    .then(res => res.json()
      .then(json => console.log(json)
      ))
    .catch(error => console.log(error));
  ;
}
