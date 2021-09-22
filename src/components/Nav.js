import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { isLoggedIn } from "../utils/helpers";

class Nav extends Component {
  render() {

    let listItems = "";
    if (this.props.loggedIn) {
      const { authedUser, users } = this.props
      const loggedInUser = users[authedUser]
      listItems = (
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/new" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leaderboard
            </NavLink>
          </li>
          <li>
            <span>Hello {loggedInUser.name}</span>
          </li>
          <li>
            <NavLink to="/logout" activeClassName="active">
              Logout
            </NavLink>
          </li>
        </ul>
      );
    } else {
      listItems = (
        <ul>
          <li>
            <NavLink to="/login" exact activeClassName="active">
              Login
            </NavLink>
          </li>
        </ul>
      );
    }

    return <nav className="nav">{listItems}</nav>;
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    loggedIn: isLoggedIn(authedUser),
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(Nav);
