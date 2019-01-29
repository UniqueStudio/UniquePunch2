import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import { reducers } from "./reducers/reducers";
import { Provider } from "react-redux";
import "./App.css";

import { Info } from "./views/info";
import { User } from "./views/user";

export const store = createStore(reducers);

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <Redirect to="/user/login/pwd" />
            </Route>
            <Route path="/user" components={User}>
              <Route path="/user/login/pwd" />
              <Route path="/user/login/wx" />
            </Route>
            <Route path="/info" components={Info} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
