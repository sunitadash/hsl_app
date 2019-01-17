import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/:operatorId?/:busId?"
          render={props => <HomePage {...props.match.params} />}
        />
      </Switch>
    );
  }
}

export default App;
