import * as React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
} from 'react-router-dom'

import { CssBaseline } from '@material-ui/core';
import { MyComponent } from './modules/myComponent';
import { MyComponent2 } from './modules/myComponent2';
import PermanetDrawer from './modules/permanetDrawer';
import RecipesList from './modules/recipesList';
import Sidebar from './modules/sidebar';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <PermanetDrawer />
        </Router>
      </React.Fragment>
    );
  }
}

const AlternateApp = (props: any) => (
  <Sidebar
    items={[
      {
        component: RecipesList,
        route: "/recipe/list",
        text: "Recipes",
      },
      {
        component: MyComponent,
        route: "/mycomponent",
        text: "My Component",
      },
      {
        component: MyComponent2,
        route: "/mycomponent2",
        text: "My Component 2",
      }
    ]}
  />
);

export default AlternateApp;
export const a = App;
// export const a = AlternateApp;
// export default App;
