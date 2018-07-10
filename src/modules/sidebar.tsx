import { AppBar, List, ListItem, ListItemText, Toolbar, Typography } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { Theme, withStyles } from '@material-ui/core/styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

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
  root: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },
  sidebar: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    position: 'relative',
    width: '250',
  },
  toolbar: theme.mixins.toolbar,
});

class SideBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { classes } = this.props;

    return (
      <Router>
        <div className={classes.root}>
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

          <Drawer
            variant="permanent"
            classes={{
              paper: classes.sidebar,
            }}
            anchor={'left'}
          >
            <div className={classes.toolbar} />
            {this.renderMenuItems()}
          </Drawer>

          {this.renderBody()}
        </div>
      </Router>
    );
  }

  private renderMenuItems() {
    return (
      <List>
        {this.props.items.map((item: any) => (
          <ListItem key={item.text} button={true}>
            <ListItemText primary={<Link to={item.route}>{item.text}</Link>} />
          </ListItem>
        ))}
      </List>
    )
  }

  private renderBody() {
    const { classes } = this.props;

    return (
      <main className={classes.content} >
        <div className={classes.toolbar} />
        {this.props.items.map((item: any) => (
          <Route key={item.text} exact={true} path={item.route} component={item.component} />
        ))}
      </main>
    )
  }


}

export default withStyles(styles)(SideBar)
