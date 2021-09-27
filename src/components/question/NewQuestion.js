import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../../actions/shared";
import { Redirect } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  };

  handleChange = (e) => {
    this.setState(() => ({
      ...this.state,
      [e.target.name]: e.target.value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestion(optionOne, optionTwo));
    this.setState(() => ({
      optionOne: "",
      optionTwo: "",
      toHome: true,
    }));
  };

  render() {
    const { toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <span>
        <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
          <Grid item md={12} sm container>
            <Grid
              item
              md
              container
              direction="column"
              spacing={1}
              align="center"
              justify="center"
              alignItems="center"
            >
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontWeight: "bold" }}
                >
                  Create New Question
                </Typography>
                <Typography variant="body2">Complete the question</Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  Would you rather...
                </Typography>
                <Fragment>
                  <TextField
                    name="optionOne"
                    label="Option 1"
                    variant="outlined"
                    onChange={this.handleChange}
                  />
                  <Typography variant="body2" gutterBottom>
                    or
                  </Typography>
                  <TextField
                    name="optionTwo"
                    label="Option 2"
                    variant="outlined"
                    onChange={this.handleChange}
                  />
                  <Typography variant="body2" color="text.secondary">
                    <br />
                    <br />
                    <Button
                      variant="contained"
                      onClick={(e) => this.handleSubmit(e)}
                    >
                      Submit Question
                    </Button>
                  </Typography>
                </Fragment>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </span>
    );
  }
}
function mapStateToProps({ authedUser }, { questionId }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
