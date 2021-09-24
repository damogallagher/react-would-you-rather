export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_USER_QUESTION_ANSWER = "SAVE_USER_QUESTION_ANSWER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function processSaveUserQuestionAnswer(authedUser, id, answer) {
  return {
    type: SAVE_USER_QUESTION_ANSWER,
    id,
    authedUser,
    answer,
  };
}
