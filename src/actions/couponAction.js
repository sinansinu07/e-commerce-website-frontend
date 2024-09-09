import axios from "axios"
import { render } from "../apis/api"

export const startGetMyCoupon = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${render}/api/user/coupons/myCoupons/`, {
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            // console.log(response.data)
            dispatch(getMyCoupon(response.data))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const getMyCoupon = (coupons) => {
    return {
        type : "SET_COUPONS",
        payload : coupons
    }
}

export const startCreateCoupon = (id) => {
    return async (dispatch) => {
        try {
            const response1 = await axios.post(`${render}/api/user/coupons/${id}/coupon1`, {}, {
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            const response2 = await axios.post(`${render}/api/user/coupons/${id}/coupon2`, {}, {
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            const coupons = []
            coupons.push(response1.data)
            coupons.push(response2.data)
            console.log(coupons)
            dispatch(addCoupon(coupons))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const addCoupon = (coupons) => {
    return {
        type : "ADD_COUPON",
        payload : coupons
    }
}