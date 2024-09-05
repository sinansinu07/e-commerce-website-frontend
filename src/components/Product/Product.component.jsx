import React from 'react';
import styles from "./Product.module.css";
import { useAuth } from '../../context/AuthContext';
// import { startCreateCart } from '../../../actions/cartAction'
import { useDispatch } from 'react-redux';
import { startCreateCart } from '../../actions/cartAction';
export default function Product({ product }) {

    const {user}= useAuth()
    const dispatch = useDispatch()

    const handleAddToCart = async (product) => {
        const cart = {
            lineItems : [
                {
                    product: product._id,
                    quantity: 1,
                    price: product.price
                }
            ]
        }
        dispatch(startCreateCart(cart))
        console.log(cart)
    }
    return (
        <div className={styles.productCard}>
        <img src={product.productImage.image_url} alt={product.description} className={styles.productImage} />
        <div className={styles.productInfo}>
            <h2 className={styles.productName}>{product.productName}</h2>
            <p className={styles.productDetails}>Color : {product.color} | Size : {product.size}</p>
            <p className={styles.productPrice}>${product.price}</p>
            <button className={styles.addToCartButton}
            onClick={()=>{
            handleAddToCart(product)
            }}
            >Add to Cart</button>
        </div>
        </div>
    )
}