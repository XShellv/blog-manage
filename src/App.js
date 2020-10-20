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
        <Route path="/manage" exact component={Edit}></Route>
        <Route path="/manage/edit" exact component={Edit}></Route>
        <Route path="/manage/edit/:id" component={Edit}></Route>
        <Route path="/manage/about" exact component={About}></Route>
        <Route path="/manage/list" component={List}></Route>
        <Route path="/manage/post/result" component={Result}></Route>
        <Route path="/manage/about/result" component={Result}></Route>
      </Layout>
    </Router>
  );
}

export default App;
