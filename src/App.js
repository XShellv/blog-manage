import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Edit from "./container/edit";
import Layout from "./layout";

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/" component={Edit}></Route>
      </Layout>
    </Router>
  );
}

export default App;
