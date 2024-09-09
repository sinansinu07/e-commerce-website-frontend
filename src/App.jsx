import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';

import Home from "./components/Home/Home.component";
import LoginForm from "./components/Login/Login.component";
import RegisterForm from './components/Register/Register.component';
import NavBar from './components/NavBar/NavBar.component';
import UnAuthorized from './general/UnAuthorized';
import CustomerContainer from './components/CustomerContainer/CustomerContainer.component';
import CustomerProfile from './components/CustomerProfile/CustomerProfile.component';
import Cart from './components/Cart/Cart.component';
import Orders from './components/Order/Order.component';
import CustomerAddresses from './components/Address/CustomerAddress.component';
import PrivateRoutes from './general/PrivateRoutes';
import SideBar from './components/SideBar/SideBar.component';

import { useAuth } from './context/AuthContext';
import { startGetProducts } from "./actions/productAction";
import { render } from './apis/api';
import { startGetReviews } from './actions/reviewAction';

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
        // if(localStorage.getItem("token")){
            dispatch(startGetProducts())
            dispatch(startGetReviews())
        // }
    }, [])
    return (
        <div className="App">
            <Routes>
                <Route path = "/" element = {<Home />}/>
                <Route path="/unauthorized" element={<UnAuthorized />} />
                <Route path = "/login" element = {<LoginForm/>} />
                <Route path = "/register" element = {<RegisterForm/>} />
                <Route path = "/navbar" element = {<NavBar/>} />
                <Route path = "/sidebar" element = {<SideBar/>} />
                <Route path = "/customer-container" element = {
                    <PrivateRoutes>
                        <CustomerContainer/>
                    </PrivateRoutes>} 
                />
                <Route path = "//customer-profile" element = {
                    <PrivateRoutes>
                        <CustomerProfile/>
                    </PrivateRoutes>} 
                />
                <Route path = "/customer-address" element = {
                    <PrivateRoutes>
                        <CustomerAddresses/>
                    </PrivateRoutes>} 
                />
                <Route path = "/cart" element = {
                    <PrivateRoutes>
                        <Cart/>
                    </PrivateRoutes>} 
                />
                <Route path = "/orders" element = {
                    <PrivateRoutes>
                        <Orders/>
                    </PrivateRoutes>} 
                />
            </Routes>
        </div>
    )
}