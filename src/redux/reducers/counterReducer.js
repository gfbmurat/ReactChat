/* eslint-disable no-unused-vars */
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    count: 0
}

const counterReducer = (state = initialState.count, action) => {
    let newState;
    switch (action.type) {

        case actionTypes.INCREASE_COUNTER:
            return (newState = state + action.payload)
        case actionTypes.DECREASE_COUNTER:
            return (newState = state - action.payload)
        default:
            return state
    }
}

export default counterReducer