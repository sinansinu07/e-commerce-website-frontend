import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddressForm from "./AddressForm.component";
import { startDeleteAddress, startGetAddresses, startSetDefaultAddress } from "../../actions/addressAction";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import NavBar from "../NavBar/NavBar.component";
import styles from './CustomerAddress.module.css';  // Import CSS module

export default function CustomerAddresses() {
    const { user } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startGetAddresses());
    }, [dispatch]);

    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [editId, setEditId] = useState("");

    const toggle1 = () => setModal1(!modal1);
    const toggle2 = () => setModal2(!modal2);

    const addresses = useSelector((state) => state.addresses);

    const handleDelete = (id) => {
        const userConfirmation = window.confirm("Are you sure?");
        if (userConfirmation) {
            dispatch(startDeleteAddress(id));
        }
    };

    const handleSetDefault = async (id) => {
        dispatch(startSetDefaultAddress(id));
    };

    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.content}>
                <h2>Your Addresses</h2>
                {addresses.data.length === 0 ? (
                    <div className={styles.noAddress}>
                        <h4>No Addresses. Add your first address.</h4>
                        <Link className={styles.addButton} onClick={toggle1}>
                            <div className={styles.addCard}>
                                <MdAdd className={styles.addIcon} />
                                <span>Add Address</span>
                            </div>
                        </Link>
                    </div>
                ) : (
                    <div className={styles.addressGrid}>
                        <Link className={styles.addButton} onClick={toggle1}>
                            <div className={styles.addCard}>
                                <MdAdd className={styles.addIcon} />
                                <span>Add Address</span>
                            </div>
                        </Link>
                        {addresses.data.map((ele) => (
                            <div className={styles.card} key={ele._id}>
                                <div className={styles.cardBody}>
                                    <h5>{ele.name}</h5>
                                    <p>{ele.addressNo}, {ele.street}, {ele.city}, {ele.state}, {ele.pincode}</p>
                                    <div className={styles.buttons}>
                                        <Link onClick={() => { setEditId(ele._id); toggle2(); }}>Edit</Link> |
                                        <Link onClick={() => handleDelete(ele._id)}>Delete</Link>
                                        {!ele.isDefault && (
                                            <Link onClick={() => handleSetDefault(ele._id)}>Set as Default</Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Modal isOpen={modal1} toggle={toggle1}>
                <ModalHeader toggle={toggle1}>Add Address</ModalHeader>
                <ModalBody>
                    <AddressForm toggle={toggle1} />
                </ModalBody>
            </Modal>
            <Modal isOpen={modal2} toggle={toggle2}>
                <ModalHeader toggle={toggle2}>Edit Address - {user?.username}</ModalHeader>
                <ModalBody>
                    <AddressForm toggle={toggle2} editId={editId} />
                </ModalBody>
            </Modal>
        </div>
    );
}
