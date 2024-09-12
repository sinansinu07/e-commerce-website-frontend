import { useDispatch, useSelector } from "react-redux"
import styles from "./Home.module.css"
import Product from "../Product/Product.component"
import NavBar from "../NavBar/NavBar.component"
import { useEffect, useState } from "react"
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

    const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;

  // Calculate the indices for slicing reviews for the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

    return (
        <div>
            <NavBar />
            <h1 className={styles.head}>Products</h1>
            {products.length === 0 ? <h3 className={styles.head}>Loading the Products...</h3> : (
                <div className={styles['product-grid']}>
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
                </div>
            )}
            <h2 className={styles.reviewHead}>Customer Reviews</h2>
                <div className={styles.reviewCarouselContainer}>
                    {reviews.length === 0 ? <h3 className={styles.head}>No Reviews... Add a new review</h3> : (
                        <div className={styles.reviewCarousel}>
                            {currentReviews.map((review, index) => (
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
                        </div>
                    )} 
                    <div className={styles.centeredButtonContainer}>
                        <button
                        onClick={() => {
                            toggle();
                        }}
                        className={styles.addReviewButton}
                        >
                        + Add Review
                        </button>
                    </div>

                    {/* Pagination controls */}
                    <div className={styles.pagination}>
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={styles.paginationButton}
                        >
                        &lt;
                        </button>
                        <p className={styles.pageNumber}>{currentPage}/{totalPages}</p>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={styles.paginationButton}
                        >
                        &gt;
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