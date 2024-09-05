import { Button } from "bootstrap"
import { useSelector } from "react-redux"
import styles from "./Home.module.css"
import LoginForm from "../Login/Login.component"

export default function Home() {

    const products = useSelector((state) => {
        return state.products.data
    })

    return (
        <div>
            <LoginForm/>
        </div>
    )
}