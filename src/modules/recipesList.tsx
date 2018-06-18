import { List, ListItem, ListItemText } from '@material-ui/core';
import * as React from 'react';
import { IRecipeInterface, Recipe } from '../models/recipe';

interface IRecipesState {
  recipes: Recipe[]
}

export class RecipesList extends React.Component<any, IRecipesState> {
  constructor(props: any) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  public componentDidMount() {
    fetch('http://localhost:8080/recipe/list')
      .then((res) => res.json())
      .then((result) => {
        const recipes: Recipe[] = result.map((json: IRecipeInterface) => new Recipe(json));
        this.setState({ recipes });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public render() {
    return (
      <div>
        <h2>Recipes</h2>
        <List>
          {this.state.recipes.map((recipe: Recipe) => (
            <ListItem key={recipe.id}>
              <ListItemText primary={recipe.name} />
            </ListItem>)
          )}
        </List>
      </div>
    )
  }
}
