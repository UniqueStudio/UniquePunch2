import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Login } from "../reducers/action";
import { checkLoginStatus, UserInfoType } from "../model/checkLoginStatus";
const UserLoginWx = React.lazy(() => import("../containers/UserLoginWx"));
const UserLoginPwd = React.lazy(() => import("../containers/UserLoginPwd"));

interface Props {
  loginStatus: boolean;
  login: (token: string, isAdmin: boolean, avatar: string, username: string) => Login;
}

class UserView extends React.PureComponent<Props & RouteComponentProps> {
  public render() {
    return (
      <React.Suspense fallback={<CircularProgress />}>
        <Switch>
          <Route path="/user/login/pwd" component={(props: any) => <UserLoginPwd {...props} />} />
          <Route path="/user/login/wx" component={(props: any) => <UserLoginWx {...props} />} />
        </Switch>
      </React.Suspense>
    );
  }
  async componentDidMount() {
    if (!this.props.loginStatus) {
      const { status, data } = await checkLoginStatus();
      if (status) {
        const token = localStorage.getItem("token") || "";
        const { isAdmin, avatar, username } = data as UserInfoType;
        this.props.login(token, isAdmin, avatar, username);
      } else {
        this.props.history.push({
          pathname: "/info/list/1"
        });
      }
    }
  }
}

export default UserView;
