import { TextField } from '@material-ui/core';
import * as R from 'ramda';
import * as React from 'react';
import { InterfaceIngredientModel } from '../models/ingredientModel';
import { getRecipeById, InterfaceRecipeModel } from '../models/recipeModel';

export class Recipe extends React.Component<{ id: number }, { id: number, recipe: InterfaceRecipeModel | undefined }> {
  constructor(props: { id: number }) {
    super(props);
    this.state = {
      id: props.id,
      recipe: undefined
    };
  }

  public componentDidMount() {
    getRecipeById(this.state.id)
      .then(recipe => {
        this.setState({ recipe });
      });
  }

  public render() {
    if (R.isNil(this.state.recipe)) {
      return (<h1>Recipe not found.</h1>);
    }

    return (
      <div>
        <h1>{this.state.recipe.name}</h1>
        {this.state.recipe.ingredients.map((ingredient: InterfaceIngredientModel, index: number) =>
          (<div>
            <TextField key={index} id={'0'} value={ingredient.name} />
          </div>)
        )}
      </div>
    );
  };
}
