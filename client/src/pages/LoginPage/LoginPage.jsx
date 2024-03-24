import Footer from "../../components/Footer/Footer"
import LoginForm from "../../components/Login/LoginForm"
import styles from "./loginpage.module.css"
const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm/>
      <Footer />
    </div>
  )
}

export default LoginPage