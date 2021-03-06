import { ListItem, ListItemText } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Theme, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as classNames from 'classnames';
import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { MyComponent } from './myComponent';
import { MyComponent2 } from './myComponent2';
import NewRecipe from './newRecipe';
import RecipesList from './recipesList';

const items = (
  <div>
    <ListItem button={true}>
      <ListItemText primary={<Link to="/recipe/list">Recipes</Link>} />
    </ListItem>
    <ListItem button={true}>
      <ListItemText primary={<Link to="/mycomponent">My Component</Link>} />
    </ListItem>
    <ListItem button={true}>
      <ListItemText primary={<Link to="/mycomponent2">My Component 2</Link>} />
    </ListItem>
  </div>
)
const drawerWidth = 240;

const styles: any = (theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    minWidth: 0, // So the Typography noWrap works
    padding: theme.spacing.unit * 3,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  root: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },
  toolbar: theme.mixins.toolbar,
});

class PermanentDrawer extends React.Component<{ classes: any }, any> {
  public render() {
    const { classes } = this.props;

    const drawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={'left'}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>{items}</List>
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-left`])}
          >
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap={true}>
                Recipe Manager
              </Typography>
            </Toolbar>
          </AppBar>
          {drawer}
        </div>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route exact={true} path="/recipe" />
          <Route exact={true} path="/recipe/list" component={RecipesList} />
          <Route exact={true} path="/recipe/new" component={NewRecipe} />
          <Route exact={true} path="/recipe/:id(\d+)" component={NewRecipe} />
          <Route exact={true} path="/mycomponent" component={MyComponent} />
          <Route exact={true} path="/mycomponent2" component={MyComponent2} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(PermanentDrawer);
