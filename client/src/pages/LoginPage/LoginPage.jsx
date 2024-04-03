import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import LoginForm from "../../components/Login/LoginForm"
import styles from "./loginpage.module.css"
import { useContext } from "react"
import AuthProvider from "../../App"
const LoginPage = () => {
const val  = useContext(AuthProvider);
  return (
    <div className={styles.container}>
      <Header  />
      <LoginForm/>
      <Footer />
    </div>
  )
}

export default LoginPage