import * as actionTypes from './actionTypes'

const increaseCounter = () => ({
    type: actionTypes.INCREASE_COUNTER, payload: 1
})

const decreaseCounter = () => ({
    type: actionTypes.DECREASE_COUNTER, payload: 1
})

const counterActions = {
    increaseCounter,
    decreaseCounter
}

export default counterActions;