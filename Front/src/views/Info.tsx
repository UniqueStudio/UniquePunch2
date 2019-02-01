import * as React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";

const DetailContainer = React.lazy(() => import("../containers/Detail"));
const InfoListContainer = React.lazy(() => import("../containers/InfoList"));
const InfoUploadRecordContainer = React.lazy(() => import("../containers/InfoUploadRecord"));

import style from "../styles/Info";
import { UserInfoType, checkLoginStatus } from "../model/checkLoginStatus";

import { RouteComponentProps } from "react-router";
import { Login } from "src/reducers/action";

interface Props extends RouteComponentProps {
  loginStatus: boolean;
  login: (token: string, isAdmin: boolean, avatar: string, username: string) => Login;
}

class InfoView extends React.PureComponent<WithStyles & Props> {
  routeRender = (Component: React.LazyExoticComponent<React.ComponentType>) => (props: RouteComponentProps) => (
    <Component />
  );
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.infoRoot}>
        <Switch>
          <Route path="/info/list/:page" render={this.routeRender(InfoListContainer)} />
          <Route path="/info/record/:page" render={this.routeRender(InfoUploadRecordContainer)} />
          <Route path="/info/detail/:id" render={this.routeRender(DetailContainer)} />
        </Switch>
      </div>
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
          pathname: "/user/login/pwd"
        });
      }
    }
  }
}

export default withStyles(style)(InfoView);
