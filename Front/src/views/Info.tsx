import * as React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";

const DetailContainer = React.lazy(() => import("../containers/Detail"));
const InfoListContainer = React.lazy(() => import("../containers/InfoList"));
const InfoUploadRecordContainer = React.lazy(() => import("../containers/InfoUploadRecord"));

import CircularProgress from "@material-ui/core/CircularProgress";

import style from "../styles/Info";

import { RouteComponentProps, Redirect } from "react-router";

interface Props extends RouteComponentProps {
  loginStatus: boolean;
}

class InfoView extends React.PureComponent<WithStyles & Props> {
  render() {
    return (
      <React.Suspense fallback={<CircularProgress />}>
        <Switch>
          {!this.props.loginStatus && <Redirect to="/user/login/pwd" />}
          <Route path="/info/list/:page" component={(props: any) => <InfoListContainer {...props} />} />
          <Route path="/info/record/:page" component={(props: any) => <InfoUploadRecordContainer {...props} />} />
          <Route path="/info/detail/:id" component={(props: any) => <DetailContainer {...props} />} />
        </Switch>
      </React.Suspense>
    );
  }
}

export default withStyles(style)(InfoView);
