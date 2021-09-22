import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import Question from "./Question";
import NewQuestion from "./NewQuestion";
class QuestionPage extends Component {
  render() {
    const { id, replies} = this.props
    return (
      <div>
        <Question questionId={id} />
        <NewQuestion id={id} />
      {replies.length !== 0 && <h3 className='center'>Replies</h3>}
      <ul>
        {replies.map((replyId) => (
          <li key={replyId}>
            <Question questionId={replyId} />
          </li>
        ))}
      </ul>
      </div>
    );
  }
}

function mapStateToProps({authedUser, questions, users}, props) {
  const {id} = props.match.params
  console.log("id:", id)
  return {
    id,
    replies: !questions[id]
    ? []
    : questions[id].replies.sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(QuestionPage);