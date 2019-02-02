import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import CircularProgress from "@material-ui/core/CircularProgress";

const UserLoginWx = React.lazy(() => import("../containers/UserLoginWx"));
const UserLoginPwd = React.lazy(() => import("../containers/UserLoginPwd"));

interface Props {
  loginStatus: boolean;
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
  componentDidMount() {
    if (this.props.loginStatus) {
      this.props.history.push({
        pathname: "/info/list/1"
      });
    }
  }
}

export default UserView;
