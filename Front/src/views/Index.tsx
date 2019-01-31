import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

import UserContainer from "../containers/User";
import InfoContainer from "../containers/Info";
import Bar from "../containers/Bar";

import withRoot from "../styles/WithRoot";

class Index extends React.Component {
  render() {
    return (
      <div className="body">
        <Bar />
        <Switch>
          <Route path="/user" component={UserContainer} />
          <Route path="/info" component={InfoContainer} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(withRoot(Index));
