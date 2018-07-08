import { createStyles, IconButton, List, ListItem, ListItemText, Paper, TextField, Theme, withStyles } from '@material-ui/core';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { InterfaceRecipeModel } from '../models/recipeModel';

interface IRecipesState {
  recipes: InterfaceRecipeModel[],
  redirect?: string,
}

const styles = (theme: Theme) => createStyles({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
});
// TODO: add a remove button for recipes - remove_circle_outline

class RecipesList extends React.Component<any, IRecipesState> {
  constructor(props: { classes: any }) {
    super(props);
    this.state = {
      recipes: [],
      redirect: undefined,
    };

    this.reloadRecipes = this.reloadRecipes.bind(this);
    this.filterNames = this.filterNames.bind(this);
  }

  public componentDidMount() {
    this.reloadRecipes();
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect push={true} to={this.state.redirect} />;
    }

    const { classes } = this.props;

    return (
      <div>
        <div style={{
          margin: '3%'
        }} >
          <h2>Recipes</h2>
          <TextField
            placeholder={"recipe name"}
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
        <Paper>
          <List
            className={classes.list}
          >
            {this.state.recipes.map((recipe: InterfaceRecipeModel) => (
              <ListItem
                key={recipe.id}
                dense={true}
                button={true}
                onClick={this.redirectToRecipe.bind(this, '/recipe/' + recipe.id)}
              >
                <ListItemText primary={(<Link style={{ "fontSize": 16 }} to={'/recipe/' + recipe.id}>{recipe.name}</Link>)} />
              </ListItem>
            )
            )}
          </List>
        </Paper>
      </div>
    );
  }

  private redirectToRecipe(route: string) {
    this.setState({ redirect: route });
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

export default withStyles(styles)(RecipesList);
