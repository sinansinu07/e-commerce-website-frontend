import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar.component";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { startGetMyOrders, startCancelOrder } from "../../actions/orderAction";
import SideBar from '../SideBar/SideBar.component'; // Import SideBar
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import styles from "./Order.module.css";

export default function Orders() {
    const orders = useSelector((state) => state.orders.data);
    const dispatch = useDispatch();
  
    const [orderId, setOrderId] = useState();
    const order = orders.find((ele) => ele._id === orderId);
  
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
  
    useEffect(() => {
      dispatch(startGetMyOrders());
    }, [dispatch]);
  
    const handleCancelOrder = (id) => {
      const confirmation = window.confirm("Are you sure to cancel the Order");
      if (confirmation) {
        dispatch(startCancelOrder(id));
      }
    };
  
    return (
      <div className={styles.pageContainer}>
        <NavBar />
        <div className={styles.mainContainer}>
            <div className={styles.leftSideContainer}>
            <SideBar />
            </div>
                <div className={styles.rightSideContainer}>
                {orders.length !== 0 ? (
                <div>
                    <h2 className={styles.head}>My Orders - {orders?.length}</h2>
                    {orders?.map((ele) => (
                    <div key={ele._id} className={styles.cartCard}>
                        <div className={styles.cartCardHeader}>
                            <h5>Purchased Online</h5>
                            <p>Order ID: {ele._id}</p>
                            <p>Total Amount: {ele.totalAmount}</p>
                            <p>Order Date: {new Date(ele.createdAt).toLocaleDateString()}</p>
                            <div className={styles.links}>
                                <Link
                                className={styles["link-style"]}
                                onClick={() => {
                                    setOrderId(ele._id);
                                    toggle();
                                }}
                                >
                                View Details
                                </Link>
                                <Link
                                className={styles["link-style"]}
                                onClick={() => handleCancelOrder(ele._id)}
                                >
                                Cancel Order
                                </Link>
                            </div>
                        </div>
                    <div
                        className={`${styles.cartCardBody} ${
                            ele.lineItems.length >= 4 ? styles.scrollableLineItems : ""
                        }`}
                        >
                        {ele.lineItems.map((lineItem) => (
                            <div>
                            {lineItem && lineItem.product && (
                                <div key={lineItem.product._id}>
                                    <img
                                        src={lineItem.product.productImage.image_url}
                                        alt={lineItem.product.productName}
                                        className={styles.image}
                                    />
                                </div>
                            )}
                            </div>
                        ))}
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <div className={styles.emptyContainer}>
                    <h2 className={styles.head}>No Orders Found</h2>
                    <p className={styles.p}>
                    Go to <Link to="/cart">Cart</Link> to create a new Order
                    </p>
                </div>
                )}
            </div>
        </div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Order Id - {orderId}</ModalHeader>
          {order && (
            <div className={styles.orderContainer}>
                <div className={styles.orderCardHeader}>
                    <p className={styles.orderDetails}>
                    Order Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className={styles.orderDetails}>
                    Shipped to : {order.customer.username}
                    </p>
                    <p className={styles.orderDetails}>Total Amount: {order.totalAmount}</p>
                    <p className={styles.orderDetails}>
                    Ordered Items : {order.lineItems.length}
                    </p>
                </div>
                <div className={styles.orderCardBody}>
                    {order.lineItems.map((lineItem) => (
                    <div key={lineItem.product._id} className={styles.orderCard}>
                        <img
                        src={lineItem.product.productImage.image_url}
                        alt={lineItem.product.productName}
                        className={styles.orderImage}
                        />
                        <div className={styles.orderInfo}>
                        <h4 className={styles.orderName}>
                            {lineItem.product.productName}
                        </h4>
                        <p className={styles.orderQty}>Qty : {lineItem.quantity}</p>
                        <p className={styles.orderDetails}>
                            color : {lineItem.product.color} | Size :{" "}
                            {lineItem.product.size}
                        </p>
                        <p className={styles.orderPrice}>${lineItem.price}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          )}
          <ModalBody></ModalBody>
        </Modal>
      </div>
    );
  }
  