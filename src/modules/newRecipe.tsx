import { IconButton, Input, TextField } from '@material-ui/core';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Create from '@material-ui/icons/Create'
import * as R from 'ramda';
import * as React from 'react';
import { InterfaceIngredientModel } from '../models/ingredientModel';
import { getRecipeById, InterfaceRecipeModel, saveRecipe } from '../models/recipeModel';

interface InterfaceState { id: number | undefined, recipe: InterfaceRecipeModel };
interface InterfaceProps { match: any | undefined, recipe: InterfaceRecipeModel | undefined };

const emptyRecipe: InterfaceRecipeModel = { name: 'Nova receita', cookingMethod: '', description: '', ingredients: [{ name: '', quantity: 0, unit: '' }] };

export class NewRecipe extends React.Component<InterfaceProps, InterfaceState> {
  constructor(props: InterfaceProps) {
    super(props);
    this.state = {
      id: props.match.params.id,
      recipe: props.recipe || emptyRecipe,
    };

    this.addIngredient = this.addIngredient.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);

    this.updateIngredient = this.updateIngredient.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateCookingMethod = this.updateCookingMethod.bind(this);
  }

  public componentDidMount() {
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
      <div style={{ width: 1000 }}>
        <div>
          <Input value={this.state.recipe.name} onChange={this.updateName} />
          <IconButton onClick={this.saveRecipe}>
            <Create />
          </IconButton>
        </div>
        <div>
          <TextField value={this.state.recipe.cookingMethod} placeholder={"Cooking Method"} helperText={"Cooking Method"} onChange={this.updateCookingMethod} />
        </div>
        <div>
          <TextField value={this.state.recipe.description} placeholder={"Description"} helperText={"Description"} multiline={true} onChange={this.updateDescription} />
        </div>

        <div>
          Add ingredient:
          <IconButton onClick={this.addIngredient}>
            <AddCircleOutline />
          </IconButton>
        </div>

        {this.state.recipe.ingredients.map((ingredient: InterfaceIngredientModel, index: number) =>
          (<div key={index}>
            <Input id={String(index)} value={ingredient.name} placeholder={"Ingredient"} onChange={this.updateIngredient.bind(this, 'name', index)} />
            <Input id={String(index)} value={ingredient.quantity} placeholder={"Quantity"} onChange={this.updateIngredient.bind(this, 'quantity', index)} />
            <Input id={String(index)} value={ingredient.unit} placeholder={"Unit"} onChange={this.updateIngredient.bind(this, 'unit', index)} />
          </div>
          )
        )}

      </div>
    );
  };

  private addIngredient() {
    const recipe = this.state.recipe;
    recipe.ingredients.push({ name: '', quantity: 0, unit: '' });
    this.setState({ recipe });
  }

  private saveRecipe() {
    const recipe = this.state.recipe;
    saveRecipe(recipe);
  }

  private updateName(event: React.ChangeEvent<HTMLInputElement>) {
    const recipe = this.state.recipe;
    recipe.name = event.currentTarget.value;
    this.setState({ recipe });
  }

  private updateDescription(event: React.ChangeEvent<HTMLInputElement>) {
    const recipe = this.state.recipe;
    recipe.description = event.currentTarget.value;
    this.setState({ recipe });
  }

  private updateCookingMethod(event: React.ChangeEvent<HTMLInputElement>) {
    const recipe = this.state.recipe;
    recipe.cookingMethod = event.currentTarget.value;
    this.setState({ recipe });
  }

  private updateIngredient(element: string, index: number, event: React.FormEvent<HTMLSelectElement>) {
    const recipe = this.state.recipe;
    recipe.ingredients[index] = {
      ...recipe.ingredients[index],
      [element]: event.currentTarget.value
    }

    this.setState({ recipe });
  }
}
