const initialState = {
    data : [],
    serverErrors : []
}

export default function CouponReducers(state = initialState, action) {
    switch(action.type) {
        case 'SET_COUPONS': {
            return {...state, data: action.payload}
        }
        case 'ADD_COUPON' : {
            return {...state, data: action.payload}
        }
        default : {
            return state
        }
    } 
}