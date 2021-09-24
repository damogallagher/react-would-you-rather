import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { isLoggedIn } from "../../utils/helpers";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

class Nav extends Component {
  render() {
    let appMenu = ""
    if (this.props.loggedIn) {
      const { authedUser } = this.props;

      appMenu = (<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0.5 }}>
              Would You Rather
            </Typography>
            <Button color="inherit"><NavLink to="/" exact activeClassName="active">Home</NavLink></Button>
            <Button color="inherit"><NavLink to="/new" exact activeClassName="active">New Question</NavLink></Button>
            <Button color="inherit"><NavLink to="/leaderboard" exact activeClassName="active">Leaderboard</NavLink></Button>
            <Button color="inherit">
              <NavLink to="/logout" exact activeClassName="active">
                Logout {authedUser.name}
              </NavLink>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>)
    } else {
      appMenu=(<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Would You Rather
            </Typography>
            <Button color="inherit"><NavLink to="/leaderboard" exact activeClassName="active">Login</NavLink></Button>
          </Toolbar>
        </AppBar>
      </Box>)
    }

     return appMenu
  
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loggedIn: isLoggedIn(authedUser),
    authedUser
  };
}

export default connect(mapStateToProps)(Nav);
