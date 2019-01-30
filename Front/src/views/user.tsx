import * as React from "react";
import { Route, Switch } from "react-router-dom";
import UserLoginWx from "./userLoginWx";
import UserLoginPwd from "../containers/userLoginPwd";

class UserView extends React.PureComponent {
  public render() {
    return (
      <div className="user">
        <Switch>
          <Route path="/user/login/pwd" component={UserLoginPwd} />
          <Route path="/user/login/wx" component={UserLoginWx} />
        </Switch>
      </div>
    );
  }
}

export default UserView;
