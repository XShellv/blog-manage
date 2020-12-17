import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import Edit from "./container/edit";
import About from "./container/about";
import List from "./container/list";
import Result from "./container/result";
import Login from "./container/login";
import Layout from "./layout";

function App() {
  return (
    <Router basename="/manage">
      <Switch>
        <Redirect exact path="/" to="/list"></Redirect>
        <Route path="/login" component={Login}></Route>
        <Layout>
          <PrivateRoute path="/list" component={List}></PrivateRoute>
          <PrivateRoute
            path="/edit/:status/:id"
            component={Edit}
          ></PrivateRoute>
          <PrivateRoute path="/edit" exact component={Edit}></PrivateRoute>
          <PrivateRoute path="/about" component={About}></PrivateRoute>
          <PrivateRoute path="/post/result" component={Result}></PrivateRoute>
          <PrivateRoute path="/about/result" component={Result}></PrivateRoute>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
