import { List, ListItem, ListItemText } from '@material-ui/core';
import * as React from 'react';
import { Ingredient, IngredientInterface } from '../models/ingredient';

interface IngredientsState {
  ingredients: Ingredient[]
}

export class Ingredients extends React.Component<any, IngredientsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ingredients: []
    };
  }

  public componentDidMount() {
    fetch('http://localhost:8080/ingredient/list')
      .then((res) => res.json())
      .then((result) => {
        const ingredients: Ingredient[] = result.map((json: IngredientInterface) => new Ingredient(json));
        this.setState({ ingredients });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public render() {
    return (
      <div>
        <h2>Ingredients</h2>
        <List>
          {this.state.ingredients.map((ingredient: Ingredient) => (
            <ListItem key={ingredient.id}>
              <ListItemText primary={ingredient.name} />
            </ListItem>)
          )}
        </List>
      </div>
    )
  }
}
