import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    console.log('authStart')
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password) => {
    console.log('auth')
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            passowrd: password,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDb7A2yvtEmszHINKzJtjrWxLYsMkINK5A', authData)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err))
            })
    }
}