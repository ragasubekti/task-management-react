import React from "react";
import RegisterForm from "./RegisterForm";
import styled from "@emotion/styled";
import { LoginPageWrapper } from "../Login/index";

export default class Login extends React.Component {
  render() {
    return (
      <LoginPageWrapper>
        <h2>Task Management Registration</h2>
        <RegisterForm />
      </LoginPageWrapper>
    );
  }
}
