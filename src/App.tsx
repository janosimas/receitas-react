import * as React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom'

import logo from './logo.svg';

const Recipes = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Ingredients = () => (
  <div>
    <h2>About</h2>
  </div>
)

const BasicExample = () => (
  <Router>
    <main>
      <div className="sidebar">
        <div className="sidebar-nav" style={{ height: '90%' }}>
          <ul>
            <li><Link to="/Recipes">Recipes</Link></li>
            <li><Link to="/Ingredients">Ingredients</Link></li>
          </ul>
        </div>
      </div>

      <section className="content">
        <Route exact={true} path="/Recipes" component={Recipes} />
        <Route exact={true} path="/Ingredients" component={Ingredients} />
      </section>
    </main>
  </Router>
)

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <BasicExample />
      </div>
    );
  }
}

export default App;
