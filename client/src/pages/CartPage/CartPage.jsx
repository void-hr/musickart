import Cart from "../../components/Cart/Cart"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import styles from "./cartpage.module.css"
const CartPage = () => {
  return (
    <div className={styles.container}>
    <Header />
    <div className={styles.home}>
    <Cart />    
    </div>
    <Footer />
    </div>
  )
}

export default CartPage