import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { RouteComponentProps } from "react-router";

const UserLoginWx = React.lazy(() => import("../containers/UserLoginWx"));
const UserLoginPwd = React.lazy(() => import("../containers/UserLoginPwd"));

interface Props {
  loginStatus: boolean;
}

class UserView extends React.PureComponent<Props & RouteComponentProps> {
  routeRender = (Component: React.LazyExoticComponent<React.ComponentType>) => (props: RouteComponentProps) => (
    <Component />
  );
  public render() {
    return (
      <div className="user">
        <Switch>
          <Route path="/user/login/pwd" render={this.routeRender(UserLoginPwd)} />
          <Route path="/user/login/wx" render={this.routeRender(UserLoginWx)} />
        </Switch>
      </div>
    );
  }
  componentDidMount() {
    if (this.props.loginStatus) {
      this.props.history.push({
        pathname: "/info/list/1"
      });
    }
  }
}

export default UserView;
