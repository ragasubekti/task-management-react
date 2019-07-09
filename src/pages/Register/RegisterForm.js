import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userRegistration } from "../../modules/user/actions";
import { Link, Redirect } from "react-router-dom";

import styled from "@emotion/styled";
import { message } from "antd";

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

export const RegisterLink = styled(Link)`
  padding: 20px 40px;

  background: #56ccf2;

  color: #fff;
  border: none;
  border-radius: 5px;
  width: 100%;
  box-shadow: 0px 10px 25px 5px rgba(47, 128, 237, 0.25);
  transition: 0.5s;
  font-size: 12.5px;
  font-weight: 600;
  margin: 0;
  width: 100%;
  display: block;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;

  &:hover {
    transition: 0.5s;
    box-shadow: 0px 10px 25px 5px rgba(47, 128, 237, 0.5);
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
  name: Yup.string().required("Full name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required")
});

class LoginFormComponent extends React.Component {
  state = {
    isSuccess: false
  };

  handleSubmit = values => {
    this.props.userRegistration(values).then(() => {
      message.success("Successfully Registered, Login to Continue");
      this.setState({
        isSuccess: true
      });
    });
  };

  render() {
    return this.props.user.isSuccess ? (
      <Redirect to="/" />
    ) : (
      <Formik
        initialValues={{
          name: "",
          username: "",
          password: ""
        }}
        validationSchema={LoginSchema}
        onSubmit={this.handleSubmit}
      >
        {({ errors }) => (
          <FormStyled>
            {this.props.user.hasError && (
              <ErrorMessageBox>
                <b style={{ fontSize: "small" }}>Oops, there's an error!</b>
                <br />
                {this.props.user.errorMessage}
              </ErrorMessageBox>
            )}
            <FieldStyled type="text" name="name" placeholder="Full Name" />
            <ErrorMessageStyled name="name" component="div" />

            <FieldStyled type="text" name="username" placeholder="Username" />
            <ErrorMessageStyled name="username" component="div" />

            <FieldStyled
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessageStyled name="password" component="div" />
            <LoginButton
              type="submit"
              disabled={
                this.props.user.isLoading || errors.username || errors.password
              }
            >
              {!this.props.user.isLoading ? "Register" : "Please Wait..."}
            </LoginButton>
            <div
              style={{
                display: "flex",
                margin: "20px",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              Already have an account?
            </div>
            <RegisterLink to="/login">Login</RegisterLink>
          </FormStyled>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.register
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ userRegistration }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);
