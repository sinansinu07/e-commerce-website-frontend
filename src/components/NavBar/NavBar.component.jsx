import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { LuLogOut } from "react-icons/lu";

import { useAuth } from "../../context/AuthContext";

import styles from "./NavBar.module.css"

export default function NavBar() {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation();
    const isCartPage = location.pathname === "/cart";
    const isOrderPage = location.pathname === "/orders"

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return (
        <div>
            <Nav className={styles["nav-bar"]}>
                <NavItem>
                    <NavLink className={styles["nav-items"]} active href="/customer-container">Home</NavLink>
                </NavItem>
                <Nav>
                    {!isOrderPage && (
                        <NavItem>
                            <NavLink className={styles["nav-items"]} active href="/orders">Orders</NavLink>
                        </NavItem>
                    )}
                    {!isCartPage && (
                        <NavItem>
                            <NavLink className={styles["nav-items"]} href="/cart">Cart</NavLink>
                        </NavItem>
                    )}
                    <NavItem>
                        <NavLink className={styles["nav-items"]} style={{ cursor: "pointer" }} onClick={toggle}>Profile</NavLink>
                    </NavItem>
                </Nav>
            </Nav>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Hello {user?.username}</ModalHeader>
                <ModalBody>
                    <Link className={styles["link-style"]} to="/customer-profile">Manage Profile</Link>
                    <div className="text-end">
                        <p className={styles['logout-text']}>Logout</p>
                        <Link className={styles["button"]} onClick={() => {
                            if (window.confirm("Are you sure to Logout")) {
                                localStorage.removeItem("token")
                                handleLogout()
                                navigate("/")
                                window.location.reload()
                            }
                        }}>
                            <LuLogOut className={styles["logout-icon"]}/>
                        </Link>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}
