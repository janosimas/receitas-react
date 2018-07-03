import { createStyles, IconButton, Snackbar, TextField, Theme, withStyles } from '@material-ui/core';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import CloseIcon from '@material-ui/icons/Close';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline'
import Save from '@material-ui/icons/Save'
import * as R from 'ramda';
import * as React from 'react';
import { InterfaceIngredientModel } from '../models/ingredientModel';
import { getRecipeById, InterfaceRecipeModel, saveRecipe } from '../models/recipeModel';

interface InterfaceState {
  id: number | undefined,
  recipe: InterfaceRecipeModel,
  error: string | undefined
};
interface InterfaceProps {
  match: any | undefined,
  recipe: InterfaceRecipeModel | undefined,
  classes: any
};

const emptyRecipe: InterfaceRecipeModel = {
  cookingMethod: '',
  description: '',
  ingredients: [],
  name: 'Nova receita',
};

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  descriptionField: {
    display: 'block',
  },
  ingredient: {
    marging: 10,
    padding: 10,
  },
  quantity: {
    marging: 10,
    maxWidth: '10%',
    padding: 10,
  },
  titleField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    size: 16,
  },
  unit: {
    marging: 10,
    padding: 10,
    width: '15%',
  },
});

export const NewRecipe = withStyles(styles)(
  // TODO: change this class name
  class NewRecipe2 extends React.Component<InterfaceProps, InterfaceState> {
    constructor(props: InterfaceProps) {
      super(props);
      this.state = {
        error: undefined,
        id: props.match.params.id,
        recipe: props.recipe || emptyRecipe,
      };

      this.addIngredient = this.addIngredient.bind(this);
      this.saveRecipe = this.saveRecipe.bind(this);

      this.updateIngredient = this.updateIngredient.bind(this);
      this.updateName = this.updateName.bind(this);
      this.updateDescription = this.updateDescription.bind(this);
      this.updateCookingMethod = this.updateCookingMethod.bind(this);
      this.handleClose = this.handleClose.bind(this);
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

      const { classes } = this.props;

      return (
        <div style={{ width: 1000 }}>
          <IconButton onClick={this.saveRecipe}>
            <Save />
          </IconButton>

          <TextField
            label={"Title"}
            className={classes.titleField}
            fullWidth={true}
            value={this.state.recipe.name || ''}
            onChange={this.updateName} />

          <TextField
            label={"Cooking Method"}
            style={{ display: 'block' }}
            value={this.state.recipe.cookingMethod || ''}
            placeholder={"Cooking Method"}
            onChange={this.updateCookingMethod} />

          <TextField
            label={"Description"}
            fullWidth={true}
            className={classes.descriptionField}
            value={this.state.recipe.description || ''}
            placeholder={"Description"}
            multiline={true}
            onChange={this.updateDescription} />

          <h2>Ingredients: </h2>
          <div className={classes.container}>
            {this.state.recipe.ingredients.map((ingredient: InterfaceIngredientModel, index: number) =>
              (<div key={index}>
                <TextField
                  label={"Ingredient"}
                  className={classes.ingredient}
                  id={String(index)}
                  value={ingredient.name || ''}
                  placeholder={"Ingredient"}
                  onChange={this.updateIngredient.bind(this, 'name', index)} />
                <TextField
                  label={"Quantity"}
                  className={classes.quantity}
                  id={String(index)}
                  value={ingredient.quantity || 0}
                  placeholder={"Quantity"}
                  onChange={this.updateIngredient.bind(this, 'quantity', index)} />
                <TextField
                  label={"Unit"}
                  className={classes.unit}
                  id={String(index)}
                  value={ingredient.unit || ''}
                  placeholder={"Unit"}
                  onChange={this.updateIngredient.bind(this, 'unit', index)} />
                <IconButton onClick={this.removeIngredient.bind(this, index)}>
                  <RemoveCircleOutline />
                </IconButton>
              </div>
              )
            )}
          </div>
          <IconButton onClick={this.addIngredient}>
            <AddCircleOutline />
          </IconButton>

          <Snackbar
            anchorOrigin={{
              horizontal: 'left',
              vertical: 'bottom',
            }}
            open={Boolean(this.state.error)}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.error}</span>}
            action={
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            } />
        </div>
      );
    };

    private handleClose() {
      this.setState({ error: undefined });
    }

    private removeIngredient(index: number) {
      const recipe = this.state.recipe;
      recipe.ingredients.splice(index, 1);
      this.setState({ recipe });
    }

    private addIngredient() {
      const recipe = this.state.recipe;
      recipe.ingredients.push({ name: '', quantity: 0, unit: '' });
      this.setState({ recipe });
    }

    private saveRecipe() {
      const recipe = this.state.recipe;
      saveRecipe(recipe).then((res: Response) => res.json()
        .then((json: any) => {
          if (res.status / 100 !== 2) {
            this.setState({ error: json.error });
          }
        }))
        .catch(json => this.setState({ error: json.error }));
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
  })
