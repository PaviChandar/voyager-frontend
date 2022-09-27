import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import hotelReducer from "./hotel-reducer"
import roomReducer from "./room-reducer";

const rootReducer = combineReducers({
    user: userReducer,
    hotel: hotelReducer,
    room:roomReducer
})

export default rootReducer