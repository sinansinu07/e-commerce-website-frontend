import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreateAddress, startUpdateAddress } from "../../actions/addressAction";
import styles from './AddressForm.module.css';

export default function AddressForm({ toggle, editId }) {
    const dispatch = useDispatch();

    const address = useSelector((state) => state.addresses.data.find(ele => ele._id === editId));

    const [form, setForm] = useState({
        name: address ? address.name : "",
        addressNo: address ? address.addressNo : "",
        street: address ? address.street : "",
        city: address ? address.city : "",
        state: address ? address.state : "",
        pincode: address ? address.pincode : ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (address) {
            dispatch(startUpdateAddress(address._id, form, toggle));
        } else {
            dispatch(startCreateAddress(form, toggle));
        }
    };

    return (
        <div>
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
                    <label htmlFor="addressNo">Address No</label>
                    <input
                        type="text"
                        value={form.addressNo}
                        onChange={handleChange}
                        id="addressNo"
                        name="addressNo"
                        className={styles.formControl}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        value={form.street}
                        onChange={handleChange}
                        id="street"
                        name="street"
                        className={styles.formControl}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        value={form.city}
                        onChange={handleChange}
                        id="city"
                        name="city"
                        className={styles.formControl}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        value={form.state}
                        onChange={handleChange}
                        id="state"
                        name="state"
                        className={styles.formControl}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="pincode">Pincode</label>
                    <input
                        type="text"
                        value={form.pincode}
                        onChange={handleChange}
                        id="pincode"
                        name="pincode"
                        className={styles.formControl}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
    );
}
