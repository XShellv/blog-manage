import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Edit from "./container/edit";
import About from "./container/about";
import Layout from "./layout";

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/" component={Edit}></Route>
        <Route path="/about" component={About}></Route>
      </Layout>
    </Router>
  );
}

export default App;
