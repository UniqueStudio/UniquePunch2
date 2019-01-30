import * as React from "react";
import { RouteComponentProps } from "react-router";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

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
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Unique Punch 2.0
            </Typography>
            {loginStatus && (
              <div>
                <IconButton aria-owns={open ? "menu-appbar" : undefined} aria-haspopup="true" color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Bar);
