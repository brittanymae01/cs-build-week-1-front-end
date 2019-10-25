import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Game from "./components/Core/Game";
import AuthenticationRoute from "./authentication/AuthenticationRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <AuthenticationRoute path="/game" component={Game} />
        <Route component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
