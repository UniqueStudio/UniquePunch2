import * as React from "react";
import { RouteComponentProps } from "react-router";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import styles from "../styles/Bar";
import { Logout, Login } from "src/reducers/action";
import RabbitAjax from "../model/ajax";
import { userInfo } from "../model/consts";

interface Props extends WithStyles {
  loginStatus: boolean;
  isAdmin: boolean;
  username: string;
  avatar: string;
  logout: () => Logout;
  login: (token: string, isAdmin: boolean, avatar: string, username: string) => Login;
}

class Bar extends React.PureComponent<RouteComponentProps & Props> {
  state = {
    showMenu: null
  };
  handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    const { loginStatus } = this.props;
    if (loginStatus) {
      this.setState({
        showMenu: event.target
      });
    } else {
      this.props.history.push({
        pathname: "/user/login/pwd"
      });
    }
  };
  handleInfo = () => {
    this.props.history.push({
      pathname: "/info"
    });
  };
  handleLogout = () => {
    this.props.logout();
  };
  handleClose = () => {
    this.setState({
      showMenu: null
    });
  };
  render() {
    const { classes, loginStatus } = this.props;
    const { showMenu } = this.state;
    const open = Boolean(showMenu);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Unique Punch 2.0
            </Typography>
            {loginStatus ? (
              <div>
                <IconButton color="inherit" aria-label="User" onClick={this.handleOnClick}>
                  <Avatar alt="Avatar" src={this.props.avatar} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.showMenu}
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
                  <MenuItem onClick={this.handleInfo}>打卡列表</MenuItem>
                  <MenuItem onClick={this.handleLogout}>登录注销</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <IconButton color="inherit" aria-label="User" onClick={this.handleOnClick}>
                  <AccountCircle />
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (!this.props.loginStatus && token) {
      const responseRaw = await RabbitAjax.post(userInfo);
      if (responseRaw.data.code === 1) {
        const { isAdmin, username, avatar } = responseRaw.data.msg;
        this.props.login(token, isAdmin, avatar, username);
      } else {
        localStorage.removeItem("token");
      }
    }
  }
}

export default withStyles(styles)(Bar);
