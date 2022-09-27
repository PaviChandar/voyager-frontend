import * as types from '../action/action-type'

const initialState = {
    user: {},
    users: [],
    isAdmin: false,
    loading: true,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_USER:
            return {
                ...state,
                loading: false
            }
        case types.LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case types.ISADMIN:
            return {
                ...state,
                isAdmin: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default userReducer