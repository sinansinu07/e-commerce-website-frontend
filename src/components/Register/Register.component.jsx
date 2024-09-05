import { useState } from "react"
import axios from "axios"

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { MdMail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'

import { localhost } from "../../apis/api"

import styles from "./Register.module.css"


Array.prototype.findErrors = function(name) {
    let result = ""
    this.forEach(ele => {
        if(ele.path === name) {
            result += ele.msg
        }
    })
    return result
    // for(let i = 0; i < this.length; i++) {
    //     let result = ""
    //     if(this[i].path === name) {
    //         result += this[i].msg
    //     }
    //     return result
    // }
}

export default function RegisterForm() {

    const navigate = useNavigate()
    const [form, setForm] = useState({
        username : "",
        password : "",
        email : "",
        countryCode : "",
        number : ""
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isVisible, setISVisible] = useState(false)

    // console.log(phone)

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
        if(form.password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
        }
        if(form.email.trim().length === 0){
            errors.email = "Email is Required"
        }
        // if(form.countryCode.trim().length === 0){
        //     errors.countryCode = "Country Code is Required"
        // }
        if(form.number.trim().length === 0){
            errors.number = "Number is Required"
        }
    }
    validateErrors()
    // const [ isRegistered, setIsRegistered ] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value })
    }
    // console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // console.log(form)

        const formData = {
            username : form.username,
            password : form.password,
            email : form.email,
            phone : {
                countryCode : `+${form.countryCode}`,
                number : form.number.replace(form.countryCode, "")
            }
        }
        // console.log(formData)

        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.post(`${localhost}/api/user/register`, formData)
                console.log(response.data)
                alert("Successfully Registered!")
                setForm({
                    username : "",
                    password : "",
                    email : "",
                })
                // setPhone("")
                setFormErrors("")
                setServerErrors("")
                // setIsRegistered(true)
                navigate("/")
            } catch(err) {
                // alert(err.message)
                console.log(err)
                setFormErrors("")
                setServerErrors(err.response.data.error)
                console.log(serverErrors)
            }
        } else {
            console.log(formErrors)
            setFormErrors(errors)
            setServerErrors("")
        }
    }

    return (
        <div className={styles["login"]}>
            <div className={styles["wrapper"]}>
                <form onSubmit={handleSubmit}>
                    <h1 className={styles["h1"]}>Register</h1>
                    {serverErrors.error && (
                        <Alert color="danger">{serverErrors && serverErrors.error} </Alert>
                    )}
                    <div className={styles["input-box"]}>
                        <input 
                            type="text"
                            name="username"
                            id="username"
                            value={form.username}
                            placeholder="Enter Username" 
                            onChange={handleChange}
                            /> 
                            <FaUser className={styles["icon"]}/>
                    </div>
                    {/* {serverErrors && serverErrors.findErrors("username") && <Alert color="danger">{serverErrors.findErrors("username")}</Alert>} */}
                    {formErrors.username && <Alert color="danger">{formErrors.username}</Alert>}
                    <div className={styles["input-box"]}>
                        <input 
                            type={isVisible ? "text" : "password"}
                            name="password"
                            id="password"
                            value={form.password}
                            placeholder="Enter password" 
                            onChange={handleChange}
                            />
                            <div onClick={() => {setISVisible(!isVisible)}}>
                                {isVisible ? <MdVisibilityOff className={styles["visible-icon"]}/> : <MdVisibility className={styles["visible-icon"]}/>}
                            </div>
                            <FaLock className={styles["icon"]}/>
                    </div>
                    {formErrors.password && <Alert color="danger">{formErrors.password}</Alert>}
                    {/* {serverErrors && serverErrors.findErrors("password") && <Alert color="danger">{serverErrors.findErrors("password")}</Alert>} */}
                    <div className={styles["input-box"]}>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                            placeholder="Confirm new Password"
                            id="confirmPassword"
                            name="confirmPassword"
                        />
                    </div>
                    {formErrors.confirmPassword && <Alert color="danger">{formErrors.confirmPassword}</Alert>}
                    <div className={styles["input-box"]}>
                        <input 
                            type="text"
                            name="email"
                            id="email"
                            value={form.email}
                            placeholder="Enter Email" 
                            onChange={handleChange}
                            />
                            <MdMail className={styles["icon"]}/>
                    </div>
                    {formErrors.email && <Alert color="danger">{formErrors.email}</Alert>}
                    {/* {serverErrors && serverErrors.findErrors("email") && <Alert color="danger">{serverErrors.findErrors("email")}</Alert>} */}
                    <div className={styles["input-box"]}>
                        <PhoneInput
                            inputStyle={{ border: "none", width: "50%", height: "10%", outline: "none" }}
                            containerStyle={{ display: "flex", alignItems: "center" }}
                            inputProps={{ style: { flex: "1", border: "none", fontSize: 16, boxShadow: "none" } }}
                            buttonStyle={{ display: "flex", border: "none", boxShadow: "none", outline: "none", height: "50%", marginTop: "20px" }}
                            className={styles["phone-input"]}
                            placeholder="Enter Mobile"
                            name="phone"
                            id="phone"
                            country={"in"}
                            value={form.number}
                            onChange={(value, data) => {
                                setForm({
                                   ...form,
                                    countryCode: data.dialCode,
                                    number: value
                                });
                            }}
                          />
                        <FaPhone className={styles["icon"]}/>
                    </div>
                    {formErrors.number && <Alert color="danger">{formErrors.number}</Alert>}
                    {/* {serverErrors && serverErrors.findErrors("phone.number") && <Alert color="danger">{serverErrors.findErrors("phone.number")}</Alert>} */}
                    
                    {/* <div className="remember-forgot">
                        <label><input type="checkbox"/>Remember me</label>
                    </div> */}
                    <input className={styles["input-button"]} type="submit" value="Register" />
                    <div className={styles["register-link"]}>
                        <label>Already have an account? Click here to </label>
                        <Link className={styles["link-style"]} to="/"><p>Login</p></Link>
                    </div>
                </form>
                
            </div>
        </div>
    )
}