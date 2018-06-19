import { TextField } from '@material-ui/core';
import * as React from 'react';
import { IngredientModel } from '../models/ingredientModel';
import { RecipeModel } from '../models/recipeModel';

export class Recipe extends React.Component<any, any> {
  constructor(props: { classes: any }) {
    super(props);
    this.state = {
      recipe: new RecipeModel({
        id: 0,
        ingredients: [],
        name: 'Nova Receita',
      })
    };
  }

  public render() {
    return (
      <div>
        <h1>{this.state.recipe.name}</h1>
        <div>ID: {this.state.recipe.id}</div>
        {this.state.recipe.ingredients.map((ingredient:IngredientModel) => (<TextField value={ingredient.name} />) )}
      </div>
    )
  }
}
