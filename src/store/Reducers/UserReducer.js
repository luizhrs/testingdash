import * as actions from '../Actions/actionTypes'

export default function(state = { loading: true}, action){
    switch(action.type){
        case actions.GET_USER:
            return {loading: false, ...action.payload}
        default: 
            return state
    }
} 