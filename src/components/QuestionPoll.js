import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import QuestionCard from "./QuestionCard.js";

class QuestionPoll extends Component {
  render() {
    const { questionId, questionAnswered} = this.props

    return (
      <Fragment>
          <QuestionCard questionId={questionId} questionAnswered={questionAnswered}/>
      </Fragment>
    )

  }
}

function mapStateToProps({authedUser, questions, users}, props) {
  const {id} = props.match.params
  const question = questions[id]
  return {
    questionId: id,
    questionAnswered: question ? questions[id].optionOne.votes.includes(authedUser.id) || questions[id].optionTwo.votes.includes(authedUser.id) : false
  }
}

export default connect(mapStateToProps)(QuestionPoll);