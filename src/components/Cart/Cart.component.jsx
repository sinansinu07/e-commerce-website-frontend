import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar.component';
import { startDecQty, startDeleteMyCartLineItem, startEmptyCart, startGetMyCart, startIncQty } from '../../actions/cartAction';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from 'axios';
import { render } from '../../apis/api';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import SideBar from '../SideBar/SideBar.component';

export default function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => {
        return state.cart.data
    })

    const coupons = useSelector((state) => {
        return state.coupons.data
      })

    const [modal, setModal] = useState(false);
    const toggle = () => {
      setModal(!modal)
    }

    useEffect(() => {
        dispatch(startGetMyCart())
    }, [dispatch])

    useEffect(() => {
        (async () => {
            try {
                const stripeId = localStorage.getItem('stripeId');
                if (stripeId) {
                    await axios.put(`${render}/api/user/payments/${stripeId}/failed`, { paymentStatus: "Failed" }, {
                        headers: { 
                            'Authorization': localStorage.getItem('token') 
                        }
                    })
                    alert("Payment Failed");
                }
                localStorage.removeItem('stripeId')
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to remove the LineItem?")) {
            dispatch(startDeleteMyCartLineItem(id))
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
                const response = await axios.post(`${render}/api/user/payments/`, {}, {
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
                <div className={styles.leftSideContainer}>
                    <SideBar/>
                </div>
                <div className={styles.rightSideContainer}>
                    <div className="row">
                    {cart?.lineItems?.length >0 && <h2 className={styles.head}>My Cart - {cart?.lineItems?.length}</h2>}
                        <div className="col-md-9">
                            <div className={styles.container}>
                            {cart?.lineItems?.length >0 && (
                                <div className={styles.emptyCoupon}>
                                <Link className={styles.emptyCartButton} onClick={() => {
                                    handleEmptyCart()
                                }}><p> Empty Cart </p></Link>
                                <Link className={styles.emptyCartButton} onClick={() => {
                                    toggle()
                                    }}> View Coupons</Link>
                                </div>
                            )}
                                {cart?.lineItems?.length > 0 ? (
                                    cart.lineItems.map((lineItem) => (
                                        <div key={lineItem?.product?._id} className={styles.cartCard}>
                                            <img src={lineItem.product?.productImage?.image_url} alt={lineItem?.product?.productName} className={styles.image} />
                                            <div className={styles.info}>
                                                <h4 className={styles.name}>{lineItem.product?.productName}</h4>
                                                <p className={styles.details}>color : {lineItem.product?.color} | Size : {lineItem.product?.size}</p>
                                                <p className={styles.price}>${lineItem.price}</p>
                                                <div className={styles.qtyContainer}>
                                                    <button className={styles.qtyButton} onClick={() => handleDecQty(lineItem.product._id)} disabled={lineItem?.quantity === 1}>
                                                        <IoIosArrowDown className={styles.arrowButton}/>
                                                    </button>
                                                    <span className={styles.qty}>{lineItem?.quantity}</span>
                                                    <button className={styles.qtyButton} onClick={() => handleIncQty(lineItem.product?._id)}>
                                                        <IoIosArrowUp className={styles.arrowButton}/>
                                                    </button>
                                                </div>
                                                <button className={styles.removeButton} onClick={() => handleDelete(lineItem.product?._id)}>
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
                        </div>
                        <div className="col-md-2">
                            <div className={styles.amountContainer}>
                                <div className={styles.title}>Total Amount</div>
                                <div className={styles.price}>
                                    {`${(!cart || cart?.length === 0 || cart?.lineItems?.length === 0) ? `$ ${0}` : `$ ${cart?.totalAmount}`}`}
                                </div>
                                <button className={styles.button} onClick={handlePayment}>Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Coupons - {coupons?.length} </ModalHeader>
          {coupons.length !== 0 ? (
            <div>
                {coupons?.map((ele) => (
                <div key={ele._id} className={styles.couponCard}>
                    <h4 className={styles.couponCode}>{ele.couponCode}</h4>
                    <p className={styles.couponDetails}>{ele.description}</p>
                    <p className={styles.couponDetails}>Discount : {ele.discount}%</p>
                    <p className={styles.couponDetails}>Validity : {new Date(ele.endDate).toLocaleDateString()}</p>
                </div>
                ))}
            </div> 
            ) : (
            <div>
                <p className={styles.couponDetails}>No Coupon Found</p>
            </div>
          )}
          <ModalBody></ModalBody>
        </Modal>
        </div>
    );
}
