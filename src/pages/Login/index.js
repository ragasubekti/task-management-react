import React from "react";
import { LoginForm } from "./LoginForm";
import styled from "@emotion/styled";

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 100vh;
  height: 100%;

  width: 100vw;
`;

export default class Login extends React.Component {
  render() {
    return (
      <LoginPageWrapper>
        <h1>Login</h1>
        <LoginForm />
      </LoginPageWrapper>
    );
  }
}
