import { saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function processSaveQuestionAnswer(authedUser, id, answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    id,
    authedUser,
    answer,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

// redux-thunk is used for these async action creators
export function handleAddQuestion(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return saveQuestion({
      text,
      author: authedUser,
      replyingTo,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}
