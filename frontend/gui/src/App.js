import React from "react";
// import { connect } from 'react-redux';
// import * as actions from './store/actions/auth';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";

export default function App(props) {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/register">Register Page</Link>
          </li>
          <li>
            <Link to="/login">Login Page</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}
