import React, { useEffect } from 'react';
import styles from './Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar.component';
import { startDecQty, startDeleteMyCartLineItem, startEmptyCart, startGetMyCart, startIncQty } from '../../actions/cartAction';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from 'axios';
import { localhost } from '../../apis/api';
import { Link } from 'react-router-dom';
import SideBar from '../SideBar/SideBar.component';

export default function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.data);

    useEffect(() => {
        dispatch(startGetMyCart());
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            try {
                const stripeId = localStorage.getItem('stripeId');
                if (stripeId) {
                    await axios.put(`${localhost}/api/user/payments/${stripeId}/failed`, { paymentStatus: "Failed" }, {
                        headers: { 'Authorization': localStorage.getItem('token') }
                    });
                    alert("Payment Failed");
                }
                localStorage.removeItem('stripeId');
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to remove the LineItem?")) {
            dispatch(startDeleteMyCartLineItem(id));
        }
    };

    const handleIncQty = (id) => dispatch(startIncQty(id));
    const handleDecQty = (id) => dispatch(startDecQty(id));
    const handleEmptyCart = () => {
        if (!cart) {
            alert("Cart is Already Empty");
        } else if (window.confirm("Are you sure to Empty the Cart items?")) {
            dispatch(startEmptyCart());
        }
    };

    const handlePayment = async () => {
        try {
            if (cart) {
                const response = await axios.post(`${localhost}/api/user/payments/`, {}, {
                    headers: { 'Authorization': localStorage.getItem('token') }
                });
                localStorage.setItem('stripeId', response.data.id);
                window.location = response.data.url;
            } else {
                alert("Your Cart is Empty");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar />
            <div className={styles.mainContainer}>
                <SideBar />
                <div className={styles.contentContainer}>
                    <div className={styles.container}>
                        <div className={`${(cart?.length === 0 || cart?.lineItems?.length === 0) ? styles.cartContainerNB : styles.cartContainer}`}>
                            {cart?.lineItems?.length > 0 ? (
                                cart.lineItems.map((lineItem) => (
                                    <div key={lineItem.product._id} className={styles.cartCard}>
                                        <img src={lineItem.product.productImage.image_url} alt={lineItem.product.productName} className={styles.image} />
                                        <div className={styles.info}>
                                            <h4 className={styles.name}>{lineItem.product.productName}</h4>
                                            <p className={styles.price}>${lineItem.price}</p>
                                            <div className={styles.qtyContainer}>
                                                <button className={styles.qtyButton} onClick={() => handleDecQty(lineItem.product._id)} disabled={lineItem.quantity === 1}>
                                                    <IoIosArrowDown />
                                                </button>
                                                <span className={styles.qty}>{lineItem.quantity}</span>
                                                <button className={styles.qtyButton} onClick={() => handleIncQty(lineItem.product._id)}>
                                                    <IoIosArrowUp />
                                                </button>
                                            </div>
                                            <button className={styles.removeButton} onClick={() => handleDelete(lineItem.product._id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.emptyContainer}>
                                    <p>go to <Link className="link-style" to="/customer-container">Home</Link> to add a new product to the cart</p>
                                    <p>Your Cart is Empty</p>
                                </div>
                            )}
                        </div>
                        <div className={styles.amountContainer}>
                            <div className={styles.title}>Total Amount</div>
                            <div className={styles.price}>
                                {`${(cart?.length === 0 || cart?.lineItems?.length === 0) ? `$ ${0}` : `$ ${cart?.totalAmount}`}`}
                            </div>
                            <button className={styles.button} onClick={handlePayment}>Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
