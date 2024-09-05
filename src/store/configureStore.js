import { createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"

import productReducers from "../reducers/productReducers"
import cartReducers from "../reducers/cartReducers"
import ordersReducers from "../reducers/orderReducers"
import addressesReducers from "../reducers/addressReducers"

const configureStore = () => {
    const store = createStore(combineReducers({
        addresses : addressesReducers,
        products : productReducers,
        cart : cartReducers,
        orders : ordersReducers
    }), applyMiddleware(thunk))

    return store
}

export default configureStore