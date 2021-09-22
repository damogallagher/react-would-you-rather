import { isEmpty } from 'lodash'
import {
    _formatQuestion
  } from './_DATA.js'

  export function formatQuestion (info) {
    return _formatQuestion(info)
  }

export function isLoggedIn(authedUser) {
  return !isEmpty(authedUser)
}