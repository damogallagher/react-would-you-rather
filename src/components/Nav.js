import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { isLoggedIn } from "../utils/helpers";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

class Nav extends Component {
  render() {
    let listItems = "";
    if (this.props.loggedIn) {
      const { authedUser, users } = this.props;
      const loggedInUser = users[authedUser];
      listItems = (
        <Toolbar>
          <Button color="inherit">
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink to="/new" activeClassName="active">
              New Question
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink to="/leaderboard" activeClassName="active">
              Leaderboard
            </NavLink>
          </Button>
          <Button color="inherit">
            <span>Hello {loggedInUser.name}</span>
          </Button>
          <Button color="inherit">
            <NavLink to="/logout" activeClassName="active">
              Logout
            </NavLink>
          </Button>
        </Toolbar>
      );
    } else {
      listItems = (
        <Toolbar>
          <Button color="inherit">
            <NavLink to="/login" exact activeClassName="active">
              Login
            </NavLink>
          </Button>
        </Toolbar>
      );
    }

    //return (<nav className="nav">{listItems}</nav>);

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">{listItems}</AppBar>
      </Box>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    loggedIn: isLoggedIn(authedUser),
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Nav);
