import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";

import { handleSaveQuestionAnswer } from "../actions/questions";
import { withRouter } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

class Question extends Component {
  toQuestion = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/question/${id}`);
  };
  handleLike = (e) => {
    e.preventDefault();
    const { dispatch, question, authedUser } = this.props;

    dispatch(
      handleSaveQuestionAnswer({
        id: question.id,
        hasLiked: question.hasLiked,
        authedUser,
      })
    );
  };
  render() {
    const { question, author } = this.props;
    if (question == null) {
      return <p>This question doesn't exist</p>;
    }

    // destructure values we need
    const { optionOne, id } = question;
    const { avatarURL, name } = author;

    return (
      <span>
        <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar alt={name} src={avatarURL} />
            </Grid>
            <Grid item md={10} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {name} asks
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Would you rather
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {optionOne.text}...
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Button
                      variant="contained"
                      onClick={(e) => this.toQuestion(e, id)}
                    >
                      View Item {id}
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </span>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { questionId }) {
  const question = questions[questionId];
  return {
    authedUser,
    question,
    author: users[question.author],
  };
}

export default withRouter(connect(mapStateToProps)(Question));
