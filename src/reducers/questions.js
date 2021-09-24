import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  SAVE_QUESTION_ANSWER,
} from "../actions/questions";

export default function questions(state = [], action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_QUESTION_ANSWER:
      console.log("SAVE_QUESTION_ANSWER action:", action)
      const a = {
        ...state,
        [action.id]: {
          ...state[action.id],
          optionOne: { 
             ...state[action.id].optionOne,
             votes: action.answer.toLowerCase() === "optionone" ? state[action.id].optionOne.votes.concat(action.authedUser) : state[action.id].optionOne.votes,
          },
          optionTwo: { 
             ...state[action.id].optionTwo, 
             votes: action.answer.toLowerCase() === "optiontwo" ? state[action.id].optionTwo.votes.concat(action.authedUser) : state[action.id].optionTwo.votes
          }
        },
      };
      console.log("a: ", a)
      return a;
    case ADD_QUESTION:
      const { question } = action;
      let replyingTo = {};
      if (question.replyingTo !== null) {
        replyingTo = {
          [question.replyingTo]: {
            ...state[question.replyingTo],
            replies: state[question.replyingTo].replies.concat([question.id]),
          },
        };
      }
      return {
        ...state,
        [action.question.id]: action.question,
        ...replyingTo,
      };
    default:
      return state;
  }
}
