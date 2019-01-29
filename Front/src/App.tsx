import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import { reducers } from "./store/store";
import "./App.css";

import { Info } from "./info/info";
import { User } from "./user/user";

export const store = createStore(reducers);

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Redirect to="/user/login/pwd" />
          </Route>
          <Route path="/user" components={User} />
          <Route path="/info" components={Info} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
