import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading";


export function handleInitialData() {
  //Uses redux-thunk for async calls
  //thunk action creator
  return (dispatch) => {
      dispatch(showLoading())
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading())
    });
  };
}