import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import NavBar from "../NavBar/NavBar.component";
import Product from "../Product/Product.component";
import axios from "axios";
import { localhost } from "../../apis/api";
import { useEffect } from "react";
import { startCreateOrder } from "../../actions/orderAction";

import styles from "./customercontainer.module.css"
import SideBar from "../SideBar/SideBar.component";

export default function CustomerContainer() {
    const {user} = useAuth()
    const dispatch = useDispatch()

    const products = useSelector((state) => {
        return state.products.data
    })

    useEffect(()=>{
        (async()=>{
            try{
                const stripeId = localStorage.getItem('stripeId')
                if(stripeId) {
                    const response = await axios.put(`${localhost}/api/user/payments/${stripeId}/success`,{paymentStatus:"Successful"}, {
                        headers:{
                            'Authorization' : localStorage.getItem('token')
                        }
                    })
                    const payment = response.data
                    console.log(payment)
                    const paymentId = payment._id
                    dispatch(startCreateOrder(paymentId))
                }
                localStorage.removeItem('stripeId')
            } catch(err){
                console.log(err)
            }
        })()
    }, [])

    return (
        <div className={styles.container}>
            <NavBar className={styles.navbar} />
            <SideBar className={styles.sidebar} />
            <div className={styles['product-grid']}>
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
    
}
