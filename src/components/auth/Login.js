import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import { setAuthedUser } from "../../actions/authedUser";
import { Redirect } from "react-router-dom";

export function Login() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [userId, setUserId] = useState("");
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const userId = e.target.value;
    setUserId(userId)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users[userId];

    dispatch(setAuthedUser(user));
    setRedirectToDashboard(true)
  };

    if (redirectToDashboard === true) {
      return <Redirect to="/" />;
    }

    let tempUsersArray = [];
    Object.keys(users).forEach((userId) => {
      const user = users[userId];
      tempUsersArray.push(user);
    });
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <InputLabel id="login">Login</InputLabel>
            <Select
              labelId="login"
              id="login"
              value={userId}
              label="Login"
              onChange={handleChange}
            >
              {tempUsersArray.map((user) => (
                <MenuItem value={user.id} key={user.id}>
                  <Avatar alt={user.name} src={user.avatarURL} />
                  {user.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={userId === ""}
            >
              Login
            </Button>
          </FormControl>
        </form>
      </div>
    );
  
}

