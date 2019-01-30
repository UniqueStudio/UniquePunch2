import * as React from "react";
import { RouteComponentProps } from "react-router";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";

import styles from "../styles/Bar";

interface Props extends WithStyles {
  loginStatus: boolean;
  isAdmin: boolean;
  username: string;
  avatar: string;
}

class Bar extends React.PureComponent<RouteComponentProps & Props> {
  state = {
    anchorEl: null
  };

  handleClose = () => {
    this.setState({ anchorEl: false });
  };

  render() {
    const { classes, loginStatus } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Unique Punch 2.0
            </Typography>
            {loginStatus ? (
              <div>
                <IconButton color="inherit" aria-label="User">
                  <Avatar alt="Avatar" src={this.props.avatar} />
                </IconButton>
              </div>
            ) : (
              <div>
                <IconButton color="inherit" aria-label="User">
                  <AccountCircle />
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Bar);
