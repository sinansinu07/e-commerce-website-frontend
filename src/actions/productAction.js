import axios from "axios";
import { localhost, render } from "../apis/api";

export const startGetProducts = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${render}/api/products`)
            // const response2 = await axios.get("https://fakestoreapi.com/products")
            // const products = response.data.concat(response2.data)
            // dispatch(setProducts(products))
            dispatch(setProducts(response.data))
            // console.log(response.data)
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const setProducts = (products) => {
    return {
        type: 'SET_PRODUCTS',
        payload: products
    }
}