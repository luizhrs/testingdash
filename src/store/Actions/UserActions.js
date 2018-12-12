import { auth } from '../../base'
import * as actions from './actionTypes'

export function getUser() {
    return dispatch => {
        auth.onAuthStateChanged(user => {
            dispatch({
                type: actions.GET_USER,
                payload: user
            })
        }) 
    }
}

export function login(email, password) {
    return dispatch => auth.signInWithEmailAndPassword(email, password)
}

export function logout() {
    return dispatch => auth.signOut()
}