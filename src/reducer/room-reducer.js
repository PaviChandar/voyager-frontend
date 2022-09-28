import * as types from '../action/action-type'

const initialState = {
    room: {},
    rooms: [],
    loading: true,
}

const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_ROOM:
            return {
                ...state,
                loading: false
            }
        case types.UPDATE_ROOM:
            return {
                ...state,
                room: action.payload,
                loading: false
            }
        case types.DELETE_ROOM:
            return {
                ...state,
                loading: true
            }
        case types.GET_SINGLE_ROOM:
            return {
                ...state,
                room: action.payload,
                loading: false
            }
        case types.GET_ALL_ROOMS:
            return {
                ...state,
                rooms: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default roomReducer