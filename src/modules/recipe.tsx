import { TextField } from '@material-ui/core';
import * as React from 'react';
import { InterfaceIngredientModel } from '../models/ingredientModel';
import { InterfaceRecipeModel } from '../models/recipeModel';

export class Recipe extends React.Component<{ recipe: InterfaceRecipeModel | undefined }, { recipe: InterfaceRecipeModel }> {
  constructor(props: { recipe: InterfaceRecipeModel }) {
    super(props);
    this.state = {
      recipe: props.recipe
    };
  }

  public render() {
    return (
      <div>
        <h1>{this.state.recipe.name}</h1>
        {this.state.recipe.ingredients.map((ingredient: InterfaceIngredientModel, index: number) =>
          (<div>
            <TextField key={100 + index} id={'0'} value={ingredient.name} />
          </div>)
        )};
      </div>
    );
  };
}
