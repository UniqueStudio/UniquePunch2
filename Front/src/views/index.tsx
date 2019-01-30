import * as React from "react";
import { Route, Switch } from "react-router-dom";

import UserContainer from "../containers/user";
import InfoContainer from "../containers/info";
import Bar from "../containers/bar";

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

export default Index;
