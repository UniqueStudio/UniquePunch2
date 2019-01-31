import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { reducers } from "./reducers/reducers";
import { Provider } from "react-redux";
import Index from "./views/Index";
import "./App.css";

export const store = createStore(reducers);

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
