import { Input } from '@material-ui/core';
import * as R from 'ramda';
import * as React from 'react';
import { InterfaceIngredientModel } from '../models/ingredientModel';
import { InterfaceRecipeModel } from '../models/recipeModel';

export class NewRecipe extends React.Component<{ recipe: InterfaceRecipeModel | undefined }, { recipe: InterfaceRecipeModel }> {
  constructor(props: { recipe: InterfaceRecipeModel | undefined }) {
    super(props);
    this.state = {
      recipe: {
        ingredients: [{ name: 'tomate' }],
        name: 'Nova Receita',
      },
    };
  }

  public render() {
    return (
      <div>
        <Input value={this.state.recipe.name} onChange={this.handleChange.bind(this, undefined)} />
        {this.state.recipe.ingredients.map((ingredient: InterfaceIngredientModel, index: number) =>
          (<div>
            <Input key={index} id={String(index)} value={ingredient.name} onChange={this.handleChange.bind(this, index)} />
          </div>)
        )}
      </div>
    );
  };

  private handleChange(index: number | undefined, event: any) {
    const recipe = this.state.recipe;
    if(R.isNil(index)) {
      recipe.name = event.target.value;
    } else {
      recipe.ingredients[index] = {
        name: event.target.value
      };
    }

    this.setState({ recipe });
  }
}
