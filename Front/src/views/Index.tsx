import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import { store } from "../App";

const UserContainer = React.lazy(() => import("../containers/User"));
const InfoContainer = React.lazy(() => import("../containers/Info"));

import Bar from "../containers/Bar";
import Footer from "../components/Footer";

import withRoot from "../styles/WithRoot";

class Index extends React.PureComponent {
  render() {
    return (
      <React.Suspense fallback={<CircularProgress />}>
        <Bar />
        <div style={{ minHeight: "1000px" }}>
          <Switch>
            <Redirect from="/" to="/info/list/1" exact />
            <Route path="/user" component={(props: any) => <UserContainer {...props} />} />
            <Route path="/info" component={(props: any) => <InfoContainer {...props} />} />
          </Switch>
        </div>
        <Footer />
      </React.Suspense>
    );
  }
  componentDidMount() {
    store.dispatch({ type: "CHECK_LOGIN_STATUS_ASYNC" });
  }
}

export default withRouter(withRoot(Index));
