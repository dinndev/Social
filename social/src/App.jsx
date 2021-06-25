import React, { useEffect } from "react";
import PostForm from "./Components/PostForm";
import Posts from "./Components/Posts";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { useDataContext } from "./Components/State/DataProvider";
import { auth, PrivateRoute, PublicRoute } from "./Components/helperFunctions";
import NewsFeed from "./Components/NewsFeed";

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
        <PrivateRoute exact={true} path="/" component={NewsFeed} />
      </Switch>
    </div>
  );
}

export default App;
