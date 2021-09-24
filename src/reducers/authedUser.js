import { LOGOUT_USER, SET_AUTHED_USER } from "../actions/authedUser";

export default function authedUser(state = null, action) {
  
  switch (action.type) {
    case SET_AUTHED_USER:
      return {
        ...state,
        id: action.id,
        name: action.name,
        avatarURL: action.avatarURL,
      };
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}
