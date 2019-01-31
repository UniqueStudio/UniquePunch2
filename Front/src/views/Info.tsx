import * as React from "react";
import { Route, Switch } from "react-router-dom";

class InfoView extends React.Component {
  public render() {
    return (
      <div className="info">
        <Switch>
          <Route path="/info/list" />
          <Route path="/info/detail/:id" />
        </Switch>
      </div>
    );
  }
}

export default InfoView;
