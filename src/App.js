import React from "react";
import { BrowserRouter as Router, Route, Redirect,Switch } from "react-router-dom";
import Edit from "./container/edit";
import About from "./container/about";
import List from "./container/list";
import Result from "./container/result";
import Layout from "./layout";

function App() {
  return (
    <Router basename="/manage">
      <Layout>
        <Switch>
          <Redirect path="/" to="/edit" exact></Redirect>
          <Route path="/edit" exact component={Edit}></Route>
          <Route path="/edit" exact component={Edit}></Route>
          <Route path="/edit/:id" component={Edit}></Route>
          <Route path="/about" exact component={About}></Route>
          <Route path="/list" component={List}></Route>
          <Route path="/post/result" component={Result}></Route>
          <Route path="/about/result" component={Result}></Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
