import axios from "axios"
import { render } from "../apis/api"

export const startGetMyOrders = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${render}/api/user/orders/myOrders`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            // console.log(response.data)
            dispatch(setOrders(response.data))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const setOrders = (orders) => {
    return {
        type : "SET_ORDERS",
        payload : orders
    }
}

export const startCreateOrder = (paymentId) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            if (state.orders.isCreatingOrder) {
                return;
            }
            dispatch({ type: "CREATE_ORDER_REQUEST" });
            const orderResponse = await axios.post(`${render}/api/user/orders/${paymentId}`, {}, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const order = orderResponse.data;
            dispatch(addOrder(order));
            dispatch({ type: "CREATE_ORDER_SUCCESS" });
            alert("Payment Successful, Your Order is Placed");
        } catch (err) {
            dispatch({ type: "CREATE_ORDER_FAILURE" });
            console.log(err);
            alert(err.message);
        }
    }
}

const addOrder = (order) => {
    return {
        type : "ADD_ORDER",
        payload : order
    }
}

export const startCancelOrder = (id) => {
    return async (dispatch) => {
        try {
            const orderResponse = await axios.put(`${render}/api/user/orders/${id}`, { status : "Canceled"}, {
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            })
            dispatch(cancelOrder(orderResponse.data))
            alert("Order Canceled Successfully")
            console.log(orderResponse.data)
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const cancelOrder = (order) => {
    return {
        type : "CANCEL_ORDER",
        payload : order
    }
}