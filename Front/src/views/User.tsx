import * as React from "react";
import { Route, Switch } from "react-router-dom";
import UserLoginWx from "../containers/UserLoginWx";
import UserLoginPwd from "../containers/UserLoginPwd";
import { RouteComponentProps } from "react-router";

interface Props {
  loginStatus: boolean;
}

class UserView extends React.PureComponent<Props & RouteComponentProps> {
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
  componentDidMount() {
    if (this.props.loginStatus) {
      this.props.history.push({
        pathname: "/info"
      });
    }
  }
}

export default UserView;
