import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
  componentDidMount() {
    if (!this.props.isAuthorized) {
      this.props.history.push("/login");
    }
  }

  render() {
    return <h1>Home</h1>;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Home);
