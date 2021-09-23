import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    userId: "",
    redirectToDashboard: false,
    usersArray: []
  };

  handleChange = (e) => {
    e.preventDefault();
    const userId = e.target.value

    this.setState(() => ({
      userId
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { userId } = this.state;
    const { dispatch, users } = this.props;
    const user = users[userId]
    dispatch(setAuthedUser(user));  
    this.setState(() => ({
      redirectToDashboard: true,
    }));
  };
  
  render() {
    const { userId, redirectToDashboard } = this.state;
    
    if (redirectToDashboard === true) {
      return <Redirect to="/" />;
    }

    const { users } = this.props
    let usersArray = [];
    Object.keys(users).forEach((userId) => {
      const user = users[userId];
      usersArray.push(user);
    });

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="login">Login</InputLabel>
          <Select
            labelId="login"
            id="login"
            value={userId}
            label="Login"
            onChange={this.handleChange}
          >
            {usersArray.map((user) => (
              <MenuItem value={user.id} key={user.id}>
                <Avatar alt={user.name} src={user.avatarURL} />
                {user.name}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" variant="contained" size="large" disabled={userId === ""}>
            Login
          </Button>
          </FormControl>


      </form>
      </div>
      );
    }
  }

function mapStateToProps({ users }) {
  return {
    users,
  };
}
export default connect(mapStateToProps)(Login);
