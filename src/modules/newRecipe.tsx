import { IconButton, Input } from '@material-ui/core';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Create from '@material-ui/icons/Create'
import * as R from 'ramda';
import * as React from 'react';
import { InterfaceIngredientModel } from '../models/ingredientModel';
import { getRecipeById, InterfaceRecipeModel, saveRecipe } from '../models/recipeModel';

interface InterfaceState { id: number | undefined, recipe: InterfaceRecipeModel };
interface InterfaceProps { match: any | undefined, recipe: InterfaceRecipeModel | undefined };

const emptyRecipe: InterfaceRecipeModel = { name: 'Nova receita', ingredients: [{ name: '' }] };

export class NewRecipe extends React.Component<InterfaceProps, InterfaceState> {
  constructor(props: InterfaceProps) {
    super(props);
    this.state = {
      id: props.match.params.id,
      recipe: props.recipe || emptyRecipe,
    };

    this.addIngredient = this.addIngredient.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
  }

  public componentDidMount() {
    console.log('state: ', this.state);
    
    if (R.isNil(this.state.id)) {
      this.setState({ recipe: emptyRecipe });
    } else {
      getRecipeById(this.state.id).then(recipe => this.setState({ recipe: recipe || emptyRecipe }));
    }
  }

  public render() {
    if (R.isNil(this.state.recipe)) {
      return <h1>Error loading recipe</h1>;
    }

    return (
      <div>
        <IconButton onClick={this.saveRecipe}>
          <Create />
        </IconButton>

        <Input value={this.state.recipe.name} onChange={this.handleChange.bind(this, undefined)} />
        <IconButton onClick={this.addIngredient}>
          <AddCircleOutline />
        </IconButton>
        {this.state.recipe.ingredients.map((ingredient: InterfaceIngredientModel, index: number) =>
          (<div>
            <Input key={index} id={String(index)} value={ingredient.name} onChange={this.handleChange.bind(this, index)} />
          </div>)
        )}
      </div>
    );
  };

  private addIngredient() {
    const recipe = this.state.recipe;
    recipe.ingredients.push({ name: '' });
    this.setState({ recipe });
  }

  private saveRecipe() {
    const recipe = this.state.recipe;
    saveRecipe(recipe);
  }

  private handleChange(index: number | undefined, event: any) {
    const recipe = this.state.recipe;
    if (R.isNil(index)) {
      recipe.name = event.target.value;
    } else {
      recipe.ingredients[index] = {
        name: event.target.value
      };
    }

    this.setState({ recipe });
  }
}
