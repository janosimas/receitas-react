import { IconButton, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import * as React from 'react';
import { Link } from 'react-router-dom';
import { InterfaceRecipeModel } from '../models/recipeModel';

interface IRecipesState {
  recipes: InterfaceRecipeModel[]
}

// TODO: add a remove button for recipes - remove_circle_outline

export class RecipesList extends React.Component<any, IRecipesState> {
  constructor(props: { classes: any }) {
    super(props);
    this.state = {
      recipes: []
    };

    this.reloadRecipes = this.reloadRecipes.bind(this);
    this.filterNames = this.filterNames.bind(this);
  }

  public componentDidMount() {
    this.reloadRecipes();
  }

  public render() {
    return (
      <div>
        <div>
          <h2>Recipes</h2>
          <TextField
            onChange={this.filterNames}
          />

          <Link to="/recipe/new">
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
          {this.state.recipes.map((recipe: InterfaceRecipeModel) => (
            <ListItem key={recipe.id}>
              <ListItemText primary={(<Link to={'/recipe/' + recipe.id}>{recipe.name}</Link>)} />
            </ListItem>)
          )}
        </List>

      </div>
    );
  }

  private filterNames(event: React.ChangeEvent<HTMLInputElement>) {
    // TODO: bug in names with spaces
    const fragment = event.currentTarget.value;
    fetch(`http://localhost:8080/recipe/list?contains=${fragment}`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({ recipes: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private reloadRecipes() {
    fetch('http://localhost:8080/recipe/list')
      .then((res) => res.json())
      .then((result) => {
        this.setState({ recipes: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
