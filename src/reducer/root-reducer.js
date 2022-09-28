import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import hotelReducer from "./hotel-reducer"
import roomReducer from "./room-reducer";
import searchReducer from "./search-reducer";

const rootReducer = combineReducers({
    user: userReducer,
    hotel: hotelReducer,
    room:roomReducer,
    search:searchReducer
})

export default rootReducer