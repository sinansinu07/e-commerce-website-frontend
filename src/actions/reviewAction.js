import axios from "axios"
import { render } from "../apis/api"

export const startGetReviews = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${render}/api/reviews/`)
            // console.log(response.data)
            dispatch(getReviews(response.data))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const getReviews = (reviews) => {
    return {
        type : "SET_REVIEWS",
        payload : reviews
    }
}

export const startCreateReview = (fromData, toggle) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${render}/api/reviews/`, fromData)
            dispatch(addReview(response.data))
            toggle()
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const addReview = (review) => {
    return {
        type : "ADD_REVIEW",
        payload : review
    }
}