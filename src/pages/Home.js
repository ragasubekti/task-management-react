import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { recheckToken } from "../modules/user";
import styled from "@emotion/styled";

const CreateTaskButton = styled.button`
  padding: 10px 20px;
  background-image: linear-gradient(to bottom right, #da4453, #89216b);
  color: #fff;
  border: none;
  border-radius: 4px;
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
      <div className="container">
        <CreateTaskButton>+ Create Task</CreateTaskButton>
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
