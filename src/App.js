import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

// import SignupWithFormik from "./components/Forms/SignupWithFormik";
import SignupFormik from "./components/Forms/SignupFormik";
import LoginFormik from "./components/Forms/LoginFormik";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginFormik} />
        <Route path="/signup">
          <SignupFormik />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
