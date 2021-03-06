import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import Layout from "../layout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";

export default hot(() => (
  <Layout>
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/logout" component={Logout} />
    </BrowserRouter>
  </Layout>
));
