import * as React from "react";
import style from "../styles/LoginPwd";
import { Login } from "../reducers/action";
import RabbitAjax from "../model/ajax";

import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router";

import { loginQrCode, loginQrCodeScan } from "../model/consts";

interface Props extends WithStyles {
  loginStatus: boolean;
  login: (token: string, isAdmin: boolean, avatar: string, username: string) => Login;
}

class UserLoginWxView extends React.PureComponent<Props & RouteComponentProps> {
  state = {
    showNotification: false,
    msgNotification: "",
    doing: false,
    key: "",
    qrcodeSrc: ""
  };
  onShow = false;
  handlePwdLogin = () => {
    this.props.history.push({ pathname: "/user/login/pwd" });
  };
  handleNotificationClose = () => {
    if (this.onShow && !this.state.doing) {
      this.handleGetQrCode();
    }
    this.setState({
      showNotification: false
    });
  };
  handleGetQrCode = async () => {
    if (this.state.doing) return;
    this.setState({
      doing: true
    });
    const responseRaw = await RabbitAjax.get(loginQrCode);
    if (responseRaw.data.code === 1) {
      this.setState({
        key: responseRaw.data.msg,
        qrcodeSrc: `https://open.work.weixin.qq.com/wwopen/sso/qrImg?key=${responseRaw.data.msg}`
      });
      this.handleGetResult();
    } else {
      this.setState({
        showNotification: true,
        msgNotification: responseRaw.data.msg
      });
    }
    this.setState({
      doing: false
    });
  };
  handleGetResult = async () => {
    const key = this.state.key;
    const responseRaw = await RabbitAjax.get(loginQrCodeScan(key));
    if (this.onShow && key === this.state.key) {
      if (responseRaw.data.code === 1) {
        const { isAdmin, avatar, username, token } = responseRaw.data.msg;
        this.props.login(token, isAdmin, avatar, username);
        this.setState({
          showNotification: true,
          msgNotification: `尊敬的${username}，登陆成功，欢迎回来！`
        });
        this.props.history.push({
          pathname: "/info/list/1"
        });
      } else {
        this.setState({
          showNotification: true,
          msgNotification: responseRaw.data.msg
        });
      }
    }
  };
  componentDidMount() {
    this.onShow = true;
    this.handleGetQrCode();
  }
  componentWillUnmount() {
    this.onShow = false;
  }
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            登录
          </Typography>
          <img src={this.state.qrcodeSrc} alt="QR Code" className={classes.qrcode} />
          <Button
            variant="contained"
            color="primary"
            className={classnames(classes.otherButton, classes.button)}
            onClick={this.handlePwdLogin}
          >
            使用账号密码登录
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

export default withStyles(style)(UserLoginWxView);
