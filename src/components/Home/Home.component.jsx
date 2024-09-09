import { useDispatch, useSelector } from "react-redux"
import styles from "./Home.module.css"
import Product from "../Product/Product.component"
import NavBar from "../NavBar/NavBar.component"
import { useState } from "react"
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { startCreateReview } from "../../actions/reviewAction"
import { PiStarThin } from "react-icons/pi";

export default function Home() {
    const dispatch = useDispatch()

    const products = useSelector((state) => {
        return state.products.data
    })
    const reviews = useSelector((state) => {
        return state.reviews.data
    })

    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal)
    }

    const [form, setForm] = useState({
        name: "",
        email : "",
        rating : "",
        description : ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(startCreateReview(form, toggle))
        // console.log(form)
    }

    return (
        <div>
            <NavBar />
            <h1 className={styles.head}>Products</h1>
                <div className={styles['product-grid']}>
                    {products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
            </div>
            <h2 className={styles.head}>Customer Reviews</h2>
                <div className={styles.reviewCarousel}>
                    {reviews.slice(0, 4).map((review) => (
                    <div key={review._id} className={styles.reviewCard}>
                        <div className={styles.reviewHeader}>
                        <p className={styles.reviewAuthor}>{review.name}</p>
                        <div className={styles.ratingContainer}>
                            <PiStarThin className={styles.starIcon} />
                            <p className={styles.reviewRating}>{review.rating}/5</p>
                        </div>
                        </div>
                        <p className={styles.reviewText}>{review.description}</p>
                    </div>
                    ))}
                    <div className={styles.reviewCard}>
                    <button
                        onClick={() => {
                        toggle();
                        }}
                        className={styles.addReviewButton}
                    >
                        + Add Review
                    </button>
                    </div>
                </div>
            
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Review</ModalHeader>
                <ModalBody>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                id="name"
                                name="name"
                                className={styles.formControl}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                value={form.email}
                                onChange={handleChange}
                                id="email"
                                name="email"
                                className={styles.formControl}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="rating">Rating</label>
                            <input
                                type="text"
                                value={form.rating}
                                onChange={handleChange}
                                id="rating"
                                name="rating"
                                className={styles.formControl}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="description">Description</label>
                            <input
                                type="textarea"
                                value={form.description}
                                onChange={handleChange}
                                id="description"
                                name="description"
                                className={styles.formControl}
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}