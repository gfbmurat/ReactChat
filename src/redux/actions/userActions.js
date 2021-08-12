import * as actionTypes from './actionTypes'

const addUser = (user) => {
    return { type: actionTypes.ADD_USER, payload: user }
}

const userActions = {
    addUser
}

export default userActions;