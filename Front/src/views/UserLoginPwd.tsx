import * as React from "react";
import classnames from "classnames";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import { RouteComponentProps } from "react-router";
import { withStyles, WithStyles } from "@material-ui/core/styles";

import style from "../styles/LoginPwd";
import { Login } from "../reducers/action";

import RabbitAjax from "../model/ajax";
import { login } from "../model/consts";
import * as crypto from "crypto";

interface Props extends WithStyles {
  loginStatus: boolean;
  avatar: string;
  username: string;
  login: (token: string, isAdmin: boolean, avatar: string, username: string) => Login;
}

class UserLoginPwdView extends React.PureComponent<RouteComponentProps & Props> {
  state = {
    nickname: "",
    password: "",
    loginBtnActive: true,
    showNotification: false,
    msgNotification: ""
  };
  handleLogin = async () => {
    this.setState({
      loginBtnActive: false
    });
    const pwdMd5 = crypto
      .createHash("md5")
      .update(this.state.password)
      .digest("hex");
    const responseRaw = await RabbitAjax.post(
      login,
      {
        nickname: this.state.nickname,
        pwd: pwdMd5
      },
      false
    );
    if (responseRaw.data.code === 1) {
      const { isAdmin, avatar, username, token } = responseRaw.data.msg;
      this.props.login(token, isAdmin, avatar, username);
      this.setState({
        showNotification: true,
        msgNotification: `尊敬的${username}，登陆成功，欢迎回来！`
      });
      this.props.history.push({
        pathname: "/info"
      });
    } else {
      this.setState({
        showNotification: true,
        msgNotification: responseRaw.data.msg
      });
    }

    this.setState({
      loginBtnActive: true
    });
  };
  handleWxLogin = () => {
    this.props.history.push({ pathname: "/user/login/wx" });
  };
  handleNickNameChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      nickname: value
    });
  };
  handlePwdChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: value
    });
  };
  handlePwdKeyDown = ({ keyCode }: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyCode === 13 && this.state.loginBtnActive) {
      this.handleLogin();
    }
  };
  handleNotificationClose = () => {
    this.setState({
      showNotification: false
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            登录
          </Typography>
          <TextField label="账号" id="account" className={classes.input} onChange={this.handleNickNameChange} />
          <TextField
            label="密码"
            id="password"
            type="password"
            className={classes.input}
            onChange={this.handlePwdChange}
            onKeyDown={this.handlePwdKeyDown}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleLogin}
            disabled={!this.state.loginBtnActive}
          >
            登录
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classnames(classes.otherButton, classes.button)}
            onClick={this.handleWxLogin}
          >
            使用企业微信扫码登录
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.showNotification}
            onClose={this.handleNotificationClose}
            autoHideDuration={6000}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.state.msgNotification}</span>}
          />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(style)(UserLoginPwdView);
