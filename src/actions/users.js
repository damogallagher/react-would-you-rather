export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_USER_QUESTION_ANSWER = "SAVE_USER_QUESTION_ANSWER";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";
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
export function addUserQuestion(authedUser, id) {
  console.log("addUserQuestion authedUser:", authedUser)
  console.log("addUserQuestion id:", id)
  return {
    type: ADD_USER_QUESTION,
    authedUser,
    id,
  };
}
