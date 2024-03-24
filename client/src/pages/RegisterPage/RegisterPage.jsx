import Footer from "../../components/Footer/Footer"
import RegisterForm from "../../components/Register/RegisterForm"
import styles from "./registerpage.module.css"
const RegisterPage = () => {
  return (
    <div className={styles.container}>
        <RegisterForm />
        <Footer />
    </div>
  )
}

export default RegisterPage