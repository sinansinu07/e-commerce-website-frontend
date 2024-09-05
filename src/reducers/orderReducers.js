const initialState = {
    data : [],
    serverErrors : [],
    isCreatingOrder: false
}

export default function ordersReducers(state = initialState, action) {
    switch (action.type) {
        case "CREATE_ORDER_REQUEST":
            return { ...state, isCreatingOrder: true };
        case "CREATE_ORDER_SUCCESS":
            return { ...state, isCreatingOrder: false };
        case "CREATE_ORDER_FAILURE":
            return { ...state, isCreatingOrder: false };
        case "SET_ORDERS" : {
            return { ...state, data : action.payload }
        }
        case "ADD_ORDER" :{
            return { ...state, data : [...state.data, action.payload] }
        }
        case "CANCEL_ORDER" : {
            return { ...state, data : state.data.filter(order => order._id !== action.payload._id) }
        }
        default : {
            return{ ...state }
        }
    }
}