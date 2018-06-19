import { IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import * as React from 'react';
import { Link } from 'react-router-dom';
import { InterfaceRecipeModel, RecipeModel } from '../models/recipeModel';

interface IRecipesState {
  recipes: RecipeModel[]
}

// TODO: add a remove button for recipes - remove_circle_outline

export class RecipesList extends React.Component<any, IRecipesState> {
  constructor(props: { classes: any }) {
    super(props);
    this.state = {
      recipes: []
    };

    this.reloadRecipes = this.reloadRecipes.bind(this);
  }

  public componentDidMount() {
    this.reloadRecipes();
  }

  public render() {
    return (
      <div>
        <div>
          <h2>Recipes</h2>
          <Link to="/recipe">
            <IconButton style={{
              position: 'fixed',
              right: 15,
              top: 80
            }}>
              <AddCircleOutline />
            </IconButton>
          </Link>
        </div>
        <List>
          {this.state.recipes.map((recipe: RecipeModel) => (
            <ListItem key={recipe.id}>
              <ListItemText primary={recipe.name} />
            </ListItem>)
          )}
        </List>

      </div>
    );
  }

  private reloadRecipes() {
    fetch('http://localhost:8080/recipe/list')
      .then((res) => res.json())
      .then((result) => {
        const recipes: RecipeModel[] = result.map((json: InterfaceRecipeModel) => new RecipeModel(json));
        this.setState({ recipes });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
