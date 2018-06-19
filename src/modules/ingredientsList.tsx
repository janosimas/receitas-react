import { IconButton, Input, List, ListItem, ListItemText } from '@material-ui/core';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import * as R from 'ramda';
import * as React from 'react';
import { IngredientModel, InterfaceIngredientModel } from '../models/ingredientModel';

// TODO: add a remove button for ingredients - remove_circle_outline

interface IngredientsState {
  ingredients: IngredientModel[],
  newIngredient: string
}

export class IngredientsList extends React.Component<{ classes: any }, IngredientsState> {
  constructor(props: { classes: any }) {
    super(props);
    this.state = {
      ingredients: [],
      newIngredient: ''
    };

    this.addIngredient = this.addIngredient.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reloadIngredients = this.reloadIngredients.bind(this);
  }

  public componentDidMount() {
    this.reloadIngredients();
  }
  
  public render() {
    return (
      <div>
        <div>
          <h2>Ingredients</h2>
          <form onSubmit={this.addIngredient} style={{
            position: 'fixed',
            right: 15,
            top: 80
          }}>
            <Input value={this.state.newIngredient} onChange={this.handleChange} />
            <IconButton type="submit" value="Submit">
              <AddCircleOutline />
            </IconButton>
          </form>
        </div>
        <List>
          {this.state.ingredients.map((ingredient: IngredientModel) => (
            <ListItem key={ingredient.id}>
              <ListItemText primary={ingredient.name} />
            </ListItem>)
          )}
        </List>

      </div>
    );
  }

  private reloadIngredients() {
    fetch('http://localhost:8080/ingredient/list')
      .then((res) => res.json())
      .then((result) => {
        const ingredients: IngredientModel[] = result.map((json: InterfaceIngredientModel) => new IngredientModel(json));
        this.setState({ ingredients });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private handleChange(event: any) {
    this.setState({ newIngredient: event.target.value });
  }

  private addIngredient() {
    const newIngredient: string | undefined = this.state.newIngredient;
    console.log(newIngredient);
    if (R.isNil(newIngredient)) {
      return;
    }

    fetch('http://localhost:8080/ingredient', {
      body: JSON.stringify({
        name: newIngredient
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
    }).then((res) => {
      this.reloadIngredients();
      this.setState({ newIngredient: '' });
      return res.json();
    }).then((body) => {
      console.log(body);
    });
  }
}
