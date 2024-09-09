import { useDispatch, useSelector } from "react-redux";
// import { useAuth } from "../../context/AuthContext";
import NavBar from "../NavBar/NavBar.component";
import Product from "../Product/Product.component";
import axios from "axios";
import { render } from "../../apis/api";
import { useEffect } from "react";
import { startCreateOrder } from "../../actions/orderAction";

import styles from "./customerContainer.module.css"
import SideBar from "../SideBar/SideBar.component";
// import { startGetProducts } from "../../actions/productAction";

export default function CustomerContainer() {
    // const {user} = useAuth()
    const dispatch = useDispatch()

    const products = useSelector((state) => {
        return state.products.data
    })

    // useEffect(() => {
    //     if(localStorage.getItem("token")){
    //         dispatch(startGetProducts())
    //     }
    // }, [dispatch])

    useEffect(()=>{
        (async()=>{
            try{
                const stripeId = localStorage.getItem('stripeId')
                if(stripeId) {
                    const response = await axios.put(`${render}/api/user/payments/${stripeId}/success`,{paymentStatus:"Successful"}, {
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
        <div className={styles.pageContainer}>
            <NavBar/>
            <div className={styles.mainContainer}>
                <div className={styles.leftSideContainer}>
                    <SideBar/>
                </div>
                <div className={styles.rightSideContainer}>
                    <h1 className={styles.head}>Products</h1>
                    <div className={styles['product-grid']}>
                        {products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
    
}
