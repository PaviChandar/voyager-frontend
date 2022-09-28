import * as types from '../action/action-type'

const initialState = {
    city: '',
    dates: [],
    loading: true,
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return {
                search: action.payload,
                loading: false
            }
        // case "RESET_SEARCH":
        //     return {
        //         search: state,
        //         loading: false
        //     }
        default:
            return state
    }
}

export default searchReducer