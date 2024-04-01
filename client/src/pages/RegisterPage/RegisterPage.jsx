import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import RegisterForm from "../../components/Register/RegisterForm"
import styles from "./registerpage.module.css"
const RegisterPage = () => {
  return (
    <div className={styles.container}>
    <div className={styles.mobile_header}>
      <Header />
     </div>
        <RegisterForm />
        <Footer />
    </div>
  )
}

export default RegisterPage