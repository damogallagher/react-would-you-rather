import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authedUser";

class Logout extends Component {
  componentDidMount() {
    this.props.dispatch(logoutUser());
    this.props.history.push("/");
  }

  render() {
    return <div>Logout</div>;
  }
}

export default connect()(Logout);
