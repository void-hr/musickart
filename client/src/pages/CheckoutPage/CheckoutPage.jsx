import Checkout from "../../components/Checkout/Checkout"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import styles from "./checkoutpage.module.css"

const CheckoutPage = () => {
  return (
    <div className={styles.container}>
        <Header />
        <Checkout />
        <Footer/>
    </div>
  )
}

export default CheckoutPage