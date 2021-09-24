import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import Question from "./QuestionCard";
import NewQuestion from "./NewQuestion";
import QuestionCard from "./QuestionCard.js";

class QuestionPoll extends Component {
  render() {
    const { questionId, question, questionAnswered} = this.props
    console.log("questionId:", questionId)
    console.log("question:", question)
    console.log("questionAnswered:", questionAnswered)
    
    if (!questionAnswered) {

    }
    return (
      <Fragment>
          <QuestionCard questionId={questionId} questionAnswered={questionAnswered}/>
      </Fragment>
    )
    // return (
    //   <div>
    //     <Question questionId={id} />
    //     <NewQuestion id={id} />
    //   {replies.length !== 0 && <h3 className='center'>Replies</h3>}
    //   <ul>
    //     {replies.map((replyId) => (
    //       <li key={replyId}>
    //         <Question questionId={replyId} />
    //       </li>
    //     ))}
    //   </ul>
    //   </div>
    // );
  }
}

function mapStateToProps({authedUser, questions, users}, props) {
  const {id} = props.match.params
  const question = questions[id]
  return {
    questionId: id,
    question: question,
    questionAnswered: question ? questions[id].optionOne.votes.includes(authedUser.id) || questions[id].optionTwo.votes.includes(authedUser.id) : false
  }
}

export default connect(mapStateToProps)(QuestionPoll);