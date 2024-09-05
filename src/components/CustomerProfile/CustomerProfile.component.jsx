import { useAuth } from "../../context/AuthContext"
import React from 'react';
// import { useNavigate } from "react-router";
import NavBar from "../NavBar/NavBar.component";

import styles from "./CustomerProfile.module.css"

export default function CustomerProfile() {

    const { user } = useAuth()

  return (
    <div>
        <NavBar />
        <h2 style={{ marginTop : '20px' }}>Your Profile</h2>
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
    </div>
  );
}
