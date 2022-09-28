import axios from "axios";
import * as types from './action-type'
import { baseUrl } from "../shared/Constants";

const userRegistered = () => ({
    type: types.REGISTER_USER
})

const userLoggedIn = (userDetail) => ({
    type: types.LOGIN_USER,
    payload: userDetail
})

const isAdmin = (isAdmin) => ({
    type: types.ISADMIN,
    payload: isAdmin
})

// isLogin - flag=true

const addHotel = (hotelDetail) => ({
    type: types.ADD_HOTEL,
    payload: hotelDetail
})

const addRoom = (roomDetail) => ({
    type: types.ADD_ROOM,
    payload: roomDetail
})

const addHotels = (hotelDetails) => ({
    type: types.GET_ALL_HOTELS,
    payload: hotelDetails
})

const addRooms = (roomDetails) => ({
    type: types.GET_ALL_ROOMS,
    payload: roomDetails
})

const removeHotel = (id) => ({
    type: types.DELETE_HOTEL,
    payload: id
})

const removeRoom = (id, hotelId) => ({
    type: types.DELETE_ROOM,
    payload: id, hotelId
})

const upgradeHotel = (id) => ({
    type: types.UPDATE_HOTEL,
    // payload: id
})

const upgradeRoom = (id) => ({
    type: types.UPDATE_ROOM,
})

const singleRoom = (room) => ({
    type: types.GET_SINGLE_ROOM,
    payload: room
})

const singleHotel = (hotel) => ({
    type: types.GET_SINGLE_HOTEL,
    payload: hotel
})

//Register User
export const registerUser = (user) => {
    return function (dispatch) {
        axios
            .post(`${baseUrl}/auth/register`, user)
            .then((res) => {
                console.log(res)
                dispatch(userRegistered)
                alert('User registered successfully')
            })
            .catch(err => {
                console.log(err)
            })
    }
}

//Login user
export const loginUser = (user) => {
    return function (dispatch) {
        axios
            .post(`${baseUrl}/auth/login`, user)
            .then((res) => {
                console.log("response : ", res.data)
                dispatch(userLoggedIn(res.data.details))
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('role', res.data.isAdmin)
                dispatch(isAdmin(res.data.isAdmin))
            })
            .catch(err => {
                console.log("error : ", err)
            })
    }
}

//Register hotel
export const registerHotel = (hotel) => {
    console.log("hotel : ", hotel);
    return function (dispatch) {
        axios
            .post(`${baseUrl}/hotels`, hotel)
            .then((res) => {
                console.log("response hotel : ", res.data)
                dispatch(addHotel())
                alert("Hotel created successfully!")
            })
            .catch((err) => {
                console.log("error : ", err)
            })
    }
}

//Register room
export const registerRoom = (id, room) => {
    console.log("room : ", room);
    return function (dispatch) {
        axios
            .post(`${baseUrl}/room/${id}`, room)
            .then((res) => {
                console.log("response room : ", res.room)
                dispatch(addRoom())
                alert("Room created successfully!")
            })
            .catch((err) => {
                console.log("error : ", err)
            })
    }
}

export const getAllHotels = (allHotels) => {
    return function (dispatch) {
        axios
            .get(`${baseUrl}/hotels/`, allHotels)
            .then((res) => {
                // console.log("All Hotels: ", allHotels)
                dispatch(addHotels())
            })
            .catch((err) => {
                console.log("error : ", err)
            })
    }
}

export const getAllRooms = (allRooms) => {
    return function (dispatch) {
        axios
            .get(`${baseUrl}/room`, allRooms)
            .then((res) => {
                console.log("All Rooms: ", allRooms)
                dispatch(addRooms())
            })
            .catch((err) => {
                console.log("error : ", err)
            })
    }
}

export const deleteHotel = (id) => {
    return function (dispatch) {
        axios
            .delete(`${baseUrl}/hotels/${id}`)
            .then((res) => {
                console.log("deleted hotel", id)
                dispatch(removeHotel())
            })
            .catch((err) => {
                console.log("Error : ", err)
            })
    }
}

export const deleteRoom = (id, hotelId) => {
    return function (dispatch) {
        axios
            .delete(`${baseUrl}/${id}/${hotelId}`)
            .then((res) => {
                console.log("deleted room : ", id, hotelId)
                dispatch(removeRoom())
            })
            .catch((err) => {
                console.log("error : ", err)
            })
    }
}

export const updateHotel = (id, hotel) => {
    return function (dispatch) {
        axios
            .put(`${baseUrl}/hotels/${id}`, hotel)
            .then((res) => {
                console.log("updated hotel : ", res)
                dispatch(upgradeHotel())
            })
            .catch((err) => {
                console.log("error : ", err)
            })
    }
}

export const updateRoom = (id, room) => {
    return function (dispatch) {
        axios
            .put(`${baseUrl}/room/${id}`, room)
            .then((res) => {
                console.log("updated room : ", res)
                dispatch(upgradeRoom())
            })
            .catch((err) => {
                console.log("error : ", err)
            })
    }
}

export const getSingleRoom = (id) => {
    return function (dispatch) {
        axios
            .get(`${baseUrl}/room/${id}`)
            .then((res) => {
                dispatch(singleRoom(res.data))
            })
            .catch((err) => {
                console.log("error : ", err)
            })
    }
}

export const getSingleHotel = (id) => {
    return function (dispatch) {
        axios
            .get(`${baseUrl}/hotels/find/${id}`)
            .then((res) => {
                dispatch(singleHotel(res.data))
            })
            .catch((err) => {
                console.log("error : ", err)
            })
    }
}

// export const getAllHotelRoom = ()