import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

import RegisterFormik from "./RegisterFormik";
import LoginFormik from "./LoginFormik";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginFormik} />
        <Route path="/register">
          <RegisterFormik />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
