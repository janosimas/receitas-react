import * as React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
} from 'react-router-dom'

import PermanetDrawer from './modules/permanetDrawer';

class App extends React.Component {
  public render() {
    return (
      <Router>
          <PermanetDrawer />
      </Router>
    );
  }
}

export default App;
