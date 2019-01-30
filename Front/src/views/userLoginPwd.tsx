import * as React from "react";
import classnames from "classnames";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { RouteComponentProps } from "react-router";
import { withStyles, WithStyles } from "@material-ui/core/styles";

import style from "../styles/loginPwd";

interface Props extends WithStyles {
  loginStatus: boolean;
  avatar: string;
  username: string;
}

class UserLoginPwdView extends React.PureComponent<RouteComponentProps & Props> {
  handleLogin = () => {
    console.log(this.props);
  };
  handleWxLogin = () => {
    this.props.history.push({ pathname: "/user/login/wx" });
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4">登录</Typography>
          <TextField label="账号" id="account" className={classes.input} />
          <TextField label="密码" id="password" type="password" className={classes.input} />
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleLogin}>
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
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(style)(UserLoginPwdView);
