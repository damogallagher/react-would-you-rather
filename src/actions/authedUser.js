export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export function setAuthedUser({id, name, avatarURL}) {
    return {
        type: SET_AUTHED_USER,
        id,
        name,
        avatarURL,
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    }
}