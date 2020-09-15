import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Edit from "./container/edit";
import About from "./container/about";
import List from "./container/list";
import Result from "./container/result";
import Layout from "./layout";

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/" exact component={Edit}></Route>
        <Route path="/edit" exact component={Edit}></Route>
        <Route path="/edit/:id" component={Edit}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/list" component={List}></Route>
        <Route path="/result" component={Result}></Route>
      </Layout>
    </Router>
  );
}

export default App;
