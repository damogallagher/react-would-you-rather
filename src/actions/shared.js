import { getInitialData, saveQuestionAnswer } from "../utils/api";
import { receiveUsers, processSaveUserQuestionAnswer } from "./users";
import { receiveQuestions, processSaveQuestionAnswer } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading";

export function handleInitialData() {
  //Uses redux-thunk for async calls
  //thunk action creator
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

// redux-thunk is used for these async action creators
export function handleSaveQuestionAnswer(info) {
  return (dispatch) => {
    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn("Error in handleSaveQuestionAnswer: ", e);
        alert("There was an error saving the question. Try again.");
      })
      .then(() => {
        dispatch(
          processSaveQuestionAnswer(info.authedUser, info.qid, info.answer)
        );
        dispatch(
          processSaveUserQuestionAnswer(info.authedUser, info.qid, info.answer)
        );
      });
  };
}
