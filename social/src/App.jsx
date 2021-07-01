import React from "react";

import "./Components/Styles/Sass/App.scss";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { PrivateRoute, PublicRoute } from "./Components/helperFunctions";
import Profile from "./Components/Profile";
import Nav from "./Components/Nav";

function App() {
  return (
    <div className="App">
      <Switch>
        <PublicRoute
          path="/signup"
          component={Signup}
          restricted={true}
          exact={true}
        />
        <PublicRoute
          path="/login"
          component={Login}
          restricted={true}
          exact={true}
        />
        <PrivateRoute exact={true} path="/" component={Profile} />
      </Switch>
      <Nav />
    </div>
  );
}

export default App;
