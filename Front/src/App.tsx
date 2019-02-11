import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { reducers } from "./reducers/reducers";
import { Provider } from "react-redux";
import sagaRoot from "./reducers/sagas";
import createSagaMiddleware from "redux-saga";
import Index from "./views/Index";
import "./App.css";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagaRoot);

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
