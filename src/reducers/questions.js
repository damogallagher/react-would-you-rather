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
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          optionOne: {
            ...state[action.id].optionOne,
            votes:
              action.answer.toLowerCase() === "optionone"
                ? state[action.id].optionOne.votes.concat(action.authedUser)
                : state[action.id].optionOne.votes,
          },
          optionTwo: {
            ...state[action.id].optionTwo,
            votes:
              action.answer.toLowerCase() === "optiontwo"
                ? state[action.id].optionTwo.votes.concat(action.authedUser)
                : state[action.id].optionTwo.votes,
          },
        },
      };
    case ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [action.question.id]: question,
      };
    default:
      return state;
  }
}
