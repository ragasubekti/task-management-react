import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { recheckToken } from "../../modules/user/actions";
import { getTaskList } from "../../modules/task/actions";

import { ProfileInfo } from "./ProfileInfo";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";

class Home extends React.Component {
  componentDidMount() {
    this.props.recheckToken().then(() => {
      if (!this.props.user.isAuthorized) {
        return this.props.history.push("/login");
      }

      this.props.getTaskList();
    });
  }

  render() {
    return (
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <CreateTask />
          <ProfileInfo />
        </div>
        <TaskList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ recheckToken, getTaskList }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
