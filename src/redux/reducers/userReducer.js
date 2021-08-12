/* eslint-disable no-unused-vars */
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    users: []
}

const userReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER:
            // console.log([...state, action.payload]);
            return ([...state, action.payload])


        default:
            return state;
    }
}

export default userReducer;