import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../modules/user/actions";

class LogoutComponent extends React.Component {
  componentDidMount() {
    this.props.logout().then(() => {
      this.props.history.push("/");
    });
  }

  render() {
    return <div />;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(LogoutComponent);
