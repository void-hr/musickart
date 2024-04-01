import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import Success from "../../components/Success/Success"
import styles from "./successpage.module.css"
const SuccessPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.mobile_header}>
        <Header/>
        </div>
        <Success />
        <Footer />
    </div>
  )
}

export default SuccessPage