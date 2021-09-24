import { RECEIVE_USERS, SAVE_USER_QUESTION_ANSWER } from "../actions/users";

export default function users(state = [], action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SAVE_USER_QUESTION_ANSWER:
        return {
          ...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            answers: {
              ...state[action.authedUser].answers,
              [action.id]: action.answer 
            }
          }
        };
    default:
      return state;
  }
}