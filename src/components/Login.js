import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  render() {
    return (
      <div className="App">
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Item>xs=6 md=8</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid item xs={6} md={8}>
            <Item>xs=6 md=8</Item>
          </Grid>
        </Grid>
        <form className="form">
          <TextField
            id="email"
            label="Standard"
            labelText="Email"
            variant="standard"
            handleChange={this.handleChange}
            type="text"
          />
          <TextField
            id="password"
            label="Standard"
            labelText="Password"
            variant="standard"
            handleChange={this.handleChange}
            type="password"
          />

          <Button type="button" color="primary" className="form__custom-button">
            Log in
          </Button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);
