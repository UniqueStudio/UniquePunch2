import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

const UserContainer = React.lazy(() => import("../containers/User"));
const InfoContainer = React.lazy(() => import("../containers/Info"));

import Bar from "../containers/Bar";
import Footer from "../components/Footer";

import withRoot from "../styles/WithRoot";

class Index extends React.Component {
  render() {
    return (
      <div className="body">
        <Bar />
        <div style={{ minHeight: "1000px" }}>
          <Switch>
            <Redirect from="/" to="/info/list/1" exact />
            <Route path="/user" component={UserContainer} />
            <Route path="/info" component={InfoContainer} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(withRoot(Index));
