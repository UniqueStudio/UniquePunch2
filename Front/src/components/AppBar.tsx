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
import { userInfo, uploadFile, updateRuntime } from "../model/consts";

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
    showMenu: null,
    uploading: false
  };
  handleFile = async (event: React.ChangeEvent) => {
    if (this.state.uploading) {
      alert("当前有文件正在上传，请稍后再上传新文件！");
      return;
    }
    this.setState({
      uploading: true
    });
    const [file] = event.target["files"];
    const formData = new FormData();
    formData.append("data", file);
    const responseRaw = await RabbitAjax.post(uploadFile, formData);
    this.setState({
      uploading: false
    });
    if (responseRaw.data.code === 1) {
      this.componentDidMount();
      alert("文件上传成功！");
    } else {
      alert(responseRaw.data.msg);
    }
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
      pathname: "/info/list/1"
    });
    this.handleClose();
  };
  handleLogout = () => {
    this.props.logout();
    this.props.history.push({
      pathname: "/user/login/pwd"
    });
    this.handleClose();
  };
  handleClose = () => {
    this.setState({
      showMenu: null
    });
  };
  handleRecord = () => {
    this.props.history.push({
      pathname: "/info/record/1"
    });
    this.setState({
      showMenu: null
    });
  };
  handleUpdateUserInfo = () => {
    this.setState({
      showMenu: null
    });
    (async function() {
      await RabbitAjax.get(updateRuntime);
      alert("已经向服务器发送请求，服务器会立即异步更新数据，请耐心等待！");
    })();
  };
  render() {
    const { classes, loginStatus, isAdmin } = this.props;
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
                <input type="file" onChange={this.handleFile} id="fileUpload" className={classes.none} />
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
                  {loginStatus && [
                    <MenuItem onClick={this.handleInfo} key="1">
                      打卡列表
                    </MenuItem>,
                    <MenuItem onClick={this.handleRecord} key="2">
                      文件记录
                    </MenuItem>
                  ]}

                  {loginStatus &&
                    isAdmin && [
                      <MenuItem key="3">
                        <label htmlFor="fileUpload" className={classes.uploadBtn}>
                          上传文件
                        </label>
                      </MenuItem>,
                      <MenuItem onClick={this.handleUpdateUserInfo} key="4">
                        更新用户
                      </MenuItem>
                    ]}

                  <MenuItem onClick={this.handleLogout} key="5">
                    注销登录
                  </MenuItem>
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
