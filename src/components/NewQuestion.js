import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { handleSaveQuestionAnswer } from "../actions/shared";
import { withRouter } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false
  };

  handleChange = (e) => {
    this.setState(() => ({
      ...this.state,
      [e.target.name]: e.target.value
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddQuestion(text, id));
    this.setState(() => ({
      optionOne: "",
      optionTwo: "",
      toHome: id ? false : true,
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
                <Typography gutterBottom variant="subtitle1" component="div" style={{fontWeight: 'bold'}}>
                  Create New Question
                </Typography>
                <Typography variant="body2">Complete the question</Typography>
                <Typography variant="body2" gutterBottom style={{fontWeight: 'bold'}}>
                  Would you rather...
                </Typography>
                <Fragment>
                  <Typography variant="body2" color="text.secondary">
                    <TextField
                      name="optionOne"
                      label="Option 1"
                      variant="outlined"
                      onChange={this.handleChange}
                    />
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    or
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <TextField
                      name="optionTwo"
                      label="Option 2"
                      variant="outlined"
                      onChange={this.handleChange}
                    />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <br /><br />
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

    // return (
    //   <Fragment>
    //     <Container maxWidth="md" s>
    //       <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    //       <TextField id="filled-basic" label="Filled" variant="filled" />
    //       <TextField id="standard-basic" label="Standard" variant="standard" />
    //     </Container>
    //   </Fragment>
    // <div>
    //   <h3 className="center">Create new Question</h3>
    //   <form className="new-question" onSubmit={this.handleSubmit}>
    //     <textarea
    //       placeholder="Whats happening"
    //       value={text}
    //       onChange={this.handleChange}
    //       className="textarea"
    //       maxLength={280}
    //     />
    //     {questionLeft <= 100 && (
    //       <div className="question-length">{questionLeft}</div>
    //     )}
    //     <button className="btn" type="submit" disabled={text === ""}>
    //       Submit
    //     </button>
    //   </form>
    // </div>
    // );
  }
}

export default connect()(NewQuestion);
