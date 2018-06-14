import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import UserPage from "./containers/UserPage";
import AdminList from "./containers/AdminList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={UserPage} />
          <Route exact path="/admin" component={AdminList} />
        </Switch>
      </div>
    );
  }
}

export default App;
