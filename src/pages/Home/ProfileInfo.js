import React from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const mapStateToProps = state => ({
  user: state.user
});

const LogoutButton = styled(Link)`
  padding: 5px 10px;
  margin-left: 20px;
  background-image: linear-gradient(to bottom right, #cb2d3e, #ef473a);
  color: #fff;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 10px 25px 5px rgba(218, 68, 83, 0.25);
  font-size: small;

  &:hover {
    color: #fff;
    text-decoration: none;
  }
`;

export const ProfileInfo = connect(mapStateToProps)(props => (
  <div>
    {props.user.name}{" "}
    {props.user.isManager && (
      <span>
        | <b>Manager</b>
      </span>
    )}
    <LogoutButton to="/logout">Logout</LogoutButton>
  </div>
));
