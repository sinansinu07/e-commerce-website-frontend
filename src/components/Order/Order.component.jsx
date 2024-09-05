import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar.component";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { startGetMyOrders, startCancelOrder } from "../../actions/orderAction";
import SideBar from '../SideBar/SideBar.component'; // Import SideBar

import styles from "./Order.module.css";

export default function Orders() {
    const orders = useSelector((state) => state.orders.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startGetMyOrders());
    }, [dispatch]);

    const handleCancelOrder = (id) => dispatch(startCancelOrder(id));

    return (
        <div className={styles.pageContainer}>
            <NavBar />
            <div className={styles.mainContainer}>
                <SideBar />
                <div className={styles.contentContainer}>
                    <h2 className={styles.title}>My Orders - {orders?.length}</h2>
                    <div className={styles.container}>
                        <div className={styles.cartContainer}>
                            {orders?.map((ele) => (
                                <div key={ele._id} className={styles.cartCard}>
                                    <div className={styles.cartCardHeader}>
                                        <p>Purchased Online</p>
                                        <p>Order ID: {ele._id}</p>
                                        <p>Total Amount: {ele.totalAmount}</p>
                                        <p>Order Date: {new Date(ele.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    {ele.lineItems.map((lineItem) => (
                                        <div key={lineItem.product._id} className={styles.cartCardBody}>
                                            <img src={lineItem.product.productImage.image_url} alt={lineItem.product.productName} className={styles.image} />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
