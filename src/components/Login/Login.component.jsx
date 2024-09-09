import { useState } from "react"
import axios from "axios"

import { Link, useNavigate } from "react-router-dom"
import { Alert } from "reactstrap";
import { FaLock, FaUser } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { useAuth } from "../../context/AuthContext";

import {render} from "../../apis/api"

import styles from "./Login.module.css"
import NavBar from "../NavBar/NavBar.component";

export default function LoginForm() {

    const { handleLogin } = useAuth()
    const navigate = useNavigate()

    const [loading, setLoading] = useState()
    const [form, setForm] = useState({
        username : "",
        password : ""
    })
    const [isVisible, setISVisible] = useState(false)

    const [formErrors, setFormErrors] = useState("")
    const [serverErrors, setServerErrors] = useState("")

    const errors = {}

    const validateErrors = () => {
        if(form.username.trim().length === 0){
            errors.username = "Username is Required"
        }
        if(form.password.trim().length === 0){
            errors.password = "Password is Required"
        }
    }
    validateErrors()

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = {
            username : form.username,
            password : form.password
        }

        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.post(`${render}/api/user/login`, formData)
                const token = response.data.token
                const user = response.data.user
                localStorage.setItem("token", token)
                // console.log(response.data)
                handleLogin(user)
                alert("Successfully Logged In")
                setFormErrors("")
                setServerErrors("")
                navigate("/customer-container")
            } catch(err) {
                // alert(err.message)
                setServerErrors(err.response.data.error)
                // console.log(err.response.data.error)
                setLoading(false)
                
                setFormErrors("")
            }
        } else {
            setFormErrors(errors)
            setLoading(false)
            setServerErrors("")
        }
    }
    // console.log(formErrors)

    return (
        <div>
            <NavBar/>
            <div className={styles["wrapper"]}>
                <form onSubmit={handleSubmit}>
                    <h1 className={styles["h1"]}>Login</h1>
                    {serverErrors && (
                        <Alert color="danger">{serverErrors} </Alert>
                    )}
                    <div className={styles["input-box"]}>
                        <input 
                            className={styles["username-input"]}
                            type="text"
                            name="username"
                            id="username"
                            value={form.username}
                            placeholder="Enter Email/Number" 
                            onChange={handleChange}
                            /> 
                            <FaUser className={styles["icon"]}/>
                    </div>
                    {formErrors.username && <Alert color="danger" className="error-message">{formErrors.username}</Alert>}
                    <div className={styles["input-box"]}>
                        <input 
                            className={styles["username-input"]}
                            type={isVisible ? "text" : "password"}
                            name="password"
                            id="password"
                            value={form.password}
                            placeholder="Enter Password" 
                            onChange={handleChange}
                            />
                            <div onClick={() => {setISVisible(!isVisible)}}>
                                {isVisible ? <MdVisibilityOff className={styles["visible-icon"]}/> : <MdVisibility className={styles["visible-icon"]}/>}
                            </div>
                            <FaLock className={styles["icon"]}/>
                    </div>
                    {/* {serverErrors[0] && <Alert color="danger">{serverErrors.findErrors("password")}</Alert>} */}
                    {formErrors.password && <Alert color="danger">{formErrors.password}</Alert>}
                    <input 
                        className={styles["input-button"]}
                        type="submit"
                        value={loading ? "Logging In..." : "Login"} />
                    <div className={styles["register-link"]}>
                        <label>Don't have an account?</label>
                        <Link to="/register" style={{ color: '#231f20' }}><p>Register</p></Link>
                    </div>
                </form>
                
            </div>
        </div>
    )
}