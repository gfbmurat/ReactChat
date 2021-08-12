import * as actionTypes from '../actions/actionTypes'

const initialState = {
    currentChannel: null
}

const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.payload
            }

        default:
            return {
                ...state
            }
    }
}

export default channelReducer