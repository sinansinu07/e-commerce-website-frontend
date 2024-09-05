import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route } from "react-router";
import Home from "./components/Home/Home.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetProducts } from "./actions/productAction";
import LoginForm from "./components/Login/Login.component";
import RegisterForm from './components/Register/Register.component';
import NavBar from './components/NavBar/NavBar.component';
import CustomerContainer from './components/CustomerContainer/CustomerContainer.component';
import { render } from './apis/api';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import UnAuthorized from './general/UnAuthorized';
import CustomerProfile from './components/CustomerProfile/CustomerProfile.component';
import Cart from './components/Cart/Cart.component';
import Orders from './components/Order/Order.component';
import CustomerAddresses from './components/Address/CustomerAddress.component';

export default function App() {
    const dispatch = useDispatch()
    const { user, handleLogin } = useAuth()

    useEffect(() => {
        if(localStorage.getItem("token")) {
            (async () => {
                const response = await axios.get(`${render}/api/user/account`, {
                    headers : {
                        "Authorization" : localStorage.getItem("token")
                    }
                })
                handleLogin(response.data)
            }) ()
        }
    }, [])

    useEffect(() => {
        dispatch(startGetProducts())
    }, [dispatch])
    return (
        <div className="App">
            <Routes>
                <Route path = "/" element = {<Home />}/>
                <Route path="/unauthorized" element={<UnAuthorized />} />
                <Route path = "/login" element = {<LoginForm/>} />
                <Route path = "/register" element = {<RegisterForm/>} />
                <Route path = "/customer-container" element = {<CustomerContainer/>} />
                <Route path = "/customer-profile" element = {<CustomerProfile/>} />
                <Route path = "/customer-address" element = {<CustomerAddresses/>} />
                <Route path = "/cart" element = {<Cart/>} />
                <Route path = "/navbar" element = {<NavBar/>} />
                <Route path = "/orders" element = {<Orders/>} />

            </Routes>
        </div>
    )
}