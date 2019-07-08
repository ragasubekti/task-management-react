import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userLogin } from "../../modules/user";

import styled from "@emotion/styled";

const FormStyled = styled(Form)`
  width: 95%;
  margin: 20px;

  @media (min-width: 768px) {
    width: 400px;
  }
`;

const FieldStyled = styled(Field)`
  padding: 20px;
  display: block;
  border-radius: 5px;
  border: 1px solid #eee;
  width: 100%;
  margin: 1em 0;
  box-sizing: border-box;

  &::placeholder {
    font-style: italic;
    /* padding: */
  }
`;

const ErrorMessageStyled = styled(ErrorMessage)`
  color: #f00;
  font-size: small;
  font-style: italic;
  margin-bottom: 20px;
`;

const LoginButton = styled.button`
  padding: 20px 40px;
  background-image: linear-gradient(to bottom right, #da4453, #89216b);
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 100%;
  box-shadow: 0px 10px 25px 5px rgba(218, 68, 83, 0.25);
  transition: 0.5s;
  font-size: 12.5px;
  font-weight: 600;
  margin: 0;

  &:hover {
    transition: 0.5s;
    box-shadow: 0px 10px 25px 5px rgba(218, 68, 83, 0.5);
  }

  &:disabled {
    transition: 0.5s;
    background: #ccc;
    box-shadow: none;
    color: grey;
  }
`;

const ErrorMessageBox = styled.div`
  padding: 20px;
  border-radius: 5px;
  background: linear-gradient(to right, #bc4e9c, #f80759);
  box-shadow: 0px 10px 25px 5px rgba(248, 7, 89, 0.25);
  color: #fff;
`;

/** Validation Schema */
const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required")
});

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ userLogin }, dispatch);

export const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(props => (
  <Formik
    initialValues={{
      username: "",
      password: ""
    }}
    validationSchema={LoginSchema}
    onSubmit={(values, { setSubmitting }) => {
      props.userLogin(values);
    }}
  >
    {({ errors }) => (
      <FormStyled>
        {props.user.hasError && (
          <ErrorMessageBox>
            <b style={{ fontSize: "small" }}>Oops, there's an error!</b>
            <br />
            {props.user.errorMessage}
          </ErrorMessageBox>
        )}
        <FieldStyled type="text" name="username" placeholder="Username" />
        <ErrorMessageStyled name="username" component="div" />
        <FieldStyled type="password" name="password" placeholder="Password" />
        <ErrorMessageStyled name="password" component="div" />
        <LoginButton
          type="submit"
          disabled={props.user.isLoading || errors.username || errors.password}
        >
          {!props.user.isLoading ? "Login" : "Please Wait..."}
        </LoginButton>
      </FormStyled>
    )}
  </Formik>
));
