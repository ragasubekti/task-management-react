import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Layout from "../layout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default () => (
  <Layout>
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </BrowserRouter>
  </Layout>
);
