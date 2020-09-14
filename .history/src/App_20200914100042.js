import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Edit from "./container/edit";
import About from "./container/about";
import Layout from "./layout";

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/" exact component={Edit}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/post/list" component={List}></Route>
      </Layout>
    </Router>
  );
}

export default App;
