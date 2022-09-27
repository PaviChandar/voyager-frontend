import * as types from '../action/action-type'

const initialState = {
    hotel: {},
    hotels: [],
    loading: true,
}

const hotelReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_HOTEL:
            return {
                ...state,
                loading: false
            }
        case types.UPDATE_HOTEL:
            return{
                ...state,
                hotel: action.payload,
                loading: false
            }
        case types.DELETE_HOTEL:
            return{
                ...state,
                loading:true
            }
        default:
            return state
    }
}

export default hotelReducer