import { isEmpty, isNull } from "lodash";

import { _formatQuestion } from "./_DATA.js";

export function formatQuestion(info) {
  return _formatQuestion(info);
}

export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function isLoggedIn(authedUser) {
  return !isNull(authedUser) && !isEmpty(authedUser) && !isEmpty(authedUser.id);
}
