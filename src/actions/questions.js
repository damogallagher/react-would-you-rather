import { saveQuestion, saveQuestionAnswer } from "../utils/api"
import { showLoading, hideLoading } from "react-redux-loading"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const TOGGLE_QUESTION = 'TOGGLE_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'


export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function toggleQuestion({id, authedUser, hasLiked}) {
    return {
        type: TOGGLE_QUESTION,
        id,
        authedUser,
        hasLiked,
    }
}

// redux-thunk is used for these async action creators
export function handleSaveQuestionAnswer(info) {
    return (dispatch) => {
        dispatch(toggleQuestion(info))

        return saveQuestionAnswer(info)
        .catch((e) => {
            console.warn('Error in handleToggleQuestion: ', e)
            dispatch(toggleQuestion(info))
            alert('There was an error liking the question. Try again.')
        })
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

// redux-thunk is used for these async action creators
export function handleAddQuestion(text, replyingTo) {
    return (dispatch, getState) => {
       const { authedUser } = getState();
       dispatch(showLoading())

        return saveQuestion({
            text,
            author: authedUser,
            replyingTo
        })
        .then ((question) => dispatch(addQuestion(question)))
        .then (() => dispatch(hideLoading()))
    }
}