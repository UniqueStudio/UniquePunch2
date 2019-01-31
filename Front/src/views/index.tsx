import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

import UserContainer from "../containers/user";
import InfoContainer from "../containers/info";
import DetailContainer from "../containers/detail";
import Bar from "../containers/bar";

import withRoot from "../styles/withRoot";

class Index extends React.Component {
  render() {
    return (
      <div className="body">
        <Bar />
        <Switch>
          <Route path="/user" component={UserContainer} />
          <Route path="/info" component={InfoContainer} />
          <Route path="/detail/:id" component={DetailContainer} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(withRoot(Index));
