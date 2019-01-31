import * as React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";

import DetailContainer from "../containers/Detail";
import style from "../styles/Info";

import { RouteComponentProps } from "react-router";

interface Props extends WithStyles {
  loginStatus: boolean;
}

class InfoView extends React.Component<Props & RouteComponentProps> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.infoRoot}>
        <Switch>
          <Route path="/info/list" />
          <Route path="/info/detail/:id" component={DetailContainer} />
        </Switch>
      </div>
    );
  }
  componentDidMount() {
    if (!this.props.loginStatus) {
      this.props.history.push({
        pathname: "/user/login/pwd"
      });
    }
  }
}

export default withStyles(style)(InfoView);
