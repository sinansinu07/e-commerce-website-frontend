import { useAuth } from "../../context/AuthContext"
import React from 'react';
// import { useNavigate } from "react-router";
import NavBar from "../NavBar/NavBar.component";

import styles from "./CustomerProfile.module.css"
import SideBar from "../SideBar/SideBar.component";
import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

export default function CustomerProfile() {

    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

  return (
    <div className={styles.pageContainer}>
        <NavBar />
        <div className={styles.mainContainer}>
            <div className={styles.leftSideContainer}>
                <SideBar/>
            </div>
            <div className={styles.rightSideContainer}>
                <h2 className={styles.head}>Your Profile</h2>
                <div className={styles['account-card']}>
                    <div className={styles['card']}>
                        <div className={styles['card-body']}>
                            <span> Username : {user?.username}</span><br/>
                        </div>
                    </div>
                    <div className={styles['card']}>
                        <div className={styles['card-body']}>
                            <span> Email : {user?.email}</span>
                        </div>
                    </div>
                    <div className={styles['card']}>
                        <div className={styles['card-body']}>
                            <span> Phone : {user?.phone?.countryCode}-{user?.phone?.number}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.contentCenter}>
                    <Link onClick={() => {
                        if (window.confirm("Are you sure to Logout")) {
                            localStorage.removeItem("token")
                            handleLogout()
                            navigate("/")
                            window.location.reload()
                        }
                    }}> <p>Logout</p></Link>
                </div>
            </div>
        </div>
    </div>
  );
}
