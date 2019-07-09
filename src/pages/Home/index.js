import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { recheckToken } from "../../modules/user";
import styled from "@emotion/styled";
import { ProfileInfo } from "./ProfileInfo";

const CreateTaskButton = styled.button`
  padding: 10px 20px;
  background-image: linear-gradient(to bottom right, #da4453, #89216b);
  color: #fff;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 10px 25px 5px rgba(218, 68, 83, 0.25);
`;

class Home extends React.Component {
  componentDidMount() {
    this.props.recheckToken().then(() => {
      if (!this.props.user.isAuthorized) {
        this.props.history.push("/login");
      }
    });
  }

  render() {
    return (
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center">
          <CreateTaskButton>+ Create Task</CreateTaskButton>
          <ProfileInfo />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ recheckToken }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
