import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

//const AUTHED_ID = "tylermcginnis";
const AUTHED_ID = "";

export function handleInitialData() {
  //Uses redux-thunk for async calls
  //thunk action creator
  return (dispatch) => {
      dispatch(showLoading())
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));

      dispatch(hideLoading())
    });
  };
}