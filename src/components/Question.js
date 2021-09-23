import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion , formatDate} from "../utils/helpers";

import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline,
} from "react-icons/ti";
import { handleSaveQuestionAnswer} from '../actions/questions'
import { Link, withRouter } from "react-router-dom";

class Question extends Component {
  toParent = (e, id) => {
    e.preventDefault();
    alert("here 1")
    this.props.history.push(`/question/${id}`)
  };
  handleLike = (e) => {
    e.preventDefault();
    const { dispatch, question, authedUser } = this.props

    dispatch(handleSaveQuestionAnswer({
        id: question.id,
        hasLiked: question.hasLiked,
        authedUser
    }))
  };
  render() {
    const { question } = this.props;
    console.log("question:", question)
    if (question == null) {
      return <p>This question doesn't exist</p>;
    }

    // destructure values we need
    const {
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      parent,
      id,
    } = question;
    return (
      <Link to={`/question/${id}`}className="question">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="question-info">
          <div>
            <span>{name}</span>
            {/* {<div>{formatDate(timestamp)}</div>  } */}
            {parent && (
              <button
                className="replying-to"
                onClick={(e) => this.toParent(e, parent.id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
        <div className="question-icons">
          <TiArrowBackOutline className="question-icon" />
          <span>{replies !== 0 && replies}</span>
          <button className="heart-button" onClick={this.handleLike}>
            {hasLiked === true ? (
              <TiHeartFullOutline color="#e0235e" className="question-icon" />
            ) : (
              <TiHeartOutline className="question-icon" />
            )}
          </button>
          <span>{likes !== 0 && likes}</span>
        </div>
        </div>
      </Link>
    );
  }
}
function mapStateToProps({ authedUser, users, questions }, { questionId }) {
  console.log("questionId:", questionId);
  const question = questions[questionId];
  const parentQuestion = question ? questions[question.replyingTo] : null;
  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser, parentQuestion)
      : null,
  };
}

export default withRouter(connect(mapStateToProps)(Question));