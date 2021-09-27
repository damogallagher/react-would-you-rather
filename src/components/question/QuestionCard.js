import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../../actions/shared";
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
import { Redirect } from "react-router-dom";

class QuestionCard extends Component {
  state = {
    selectionOption: "",
  };

  toQuestion = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/question/${id}`);
  };

  handleRadioButtonChange = (e) => {
    e.preventDefault();
    this.setState(() => ({
      selectionOption: e.target.value,
    }));
  };

  answerQuestion = (e) => {
    e.preventDefault();
    const { dispatch, question, authedUser } = this.props;
    const { selectionOption } = this.state;

    dispatch(
      handleSaveQuestionAnswer({
        authedUser: authedUser.id,
        qid: question.id,
        answer: selectionOption,
      })
    );
  };

  render() {
    const {
      question,
      author,
      showPreview,
      questionAnswered,
      optionOneSelected,
      optionTwoSelected,
    } = this.props;
    if (question == null) {
      return <Redirect to="/404" />;
    }

    // destructure values we need
    const { optionOne, optionTwo, id } = question;
    const { avatarURL, name } = author;
    const { selectionOption } = this.state;

    let totalVotes = 0;
    if (!showPreview && questionAnswered) {
      totalVotes = optionOne.votes.length + optionTwo.votes.length;
    }

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
                  {showPreview && (
                    <Fragment>
                      <Typography variant="body2" color="text.secondary">
                        {optionOne.text}... <br />
                        <br />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Button
                          variant="contained"
                          onClick={(e) => this.toQuestion(e, id)}
                        >
                          View Poll
                        </Button>
                      </Typography>
                    </Fragment>
                  )}

                  {!showPreview && !questionAnswered && (
                    <Fragment>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="Select Option"
                          value={selectionOption}
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="optionOne"
                            control={
                              <Radio onChange={this.handleRadioButtonChange} />
                            }
                            label={optionOne.text}
                          />
                          <FormControlLabel
                            value="optionTwo"
                            control={
                              <Radio onChange={this.handleRadioButtonChange} />
                            }
                            label={optionTwo.text}
                          />
                        </RadioGroup>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                        <Button
                          variant="contained"
                          onClick={(e) => this.answerQuestion(e)}
                          disabled={selectionOption === ""}
                        >
                          Answer
                        </Button>
                      </Typography>
                    </Fragment>
                  )}

                  {!showPreview && questionAnswered && (
                    <Fragment>
                      <div variant="body2" color="text.secondary">
                        <span
                          style={{
                            backgroundColor: optionOneSelected ? "yellow" : "",
                          }}
                        >
                          {optionOne.text}
                        </span>
                        <span>
                          {optionOneSelected && (
                            <Chip label="Your Vote" variant="outlined" />
                          )}
                        </span>
                        <br />
                        <b>
                          {optionOne.votes.length} out of {totalVotes} votes
                        </b>
                      </div>
                      <div variant="body2" color="text.secondary">
                        <span
                          style={{
                            backgroundColor: optionTwoSelected ? "yellow" : "",
                          }}
                        >
                          {optionTwo.text}
                        </span>
                        <span>
                          {optionTwoSelected && (
                            <Chip label="Your Vote" variant="outlined" />
                          )}
                        </span>
                        <br />
                        <b>
                          {optionTwo.votes.length} out of {totalVotes} votes
                        </b>
                      </div>
                    </Fragment>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </span>
    );
  }
}

QuestionCard.propTypes = {
  showPreview: PropTypes.bool,
  questionAnswered: PropTypes.bool,
};

function mapStateToProps({ authedUser, users, questions }, { questionId }) {
  const question = questions[questionId];
  return {
    authedUser,
    question,
    author: question ? users[question.author] : "",
    optionOneSelected: question
      ? question.optionOne.votes.includes(authedUser.id)
      : false,
    optionTwoSelected: question
      ? question.optionTwo.votes.includes(authedUser.id)
      : false,
  };
}

export default withRouter(connect(mapStateToProps)(QuestionCard));
