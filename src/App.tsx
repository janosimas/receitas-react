import * as React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
} from 'react-router-dom'

import { CssBaseline } from '@material-ui/core';
import PermanetDrawer from './modules/permanetDrawer';

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

export default App;
