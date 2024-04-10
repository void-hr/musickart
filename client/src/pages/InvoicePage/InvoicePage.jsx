import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import Invoice from "../../components/Invoice/Invoice"
import SubNavbar from "../../components/SubNavbar/SubNavbar"
import styles from "./invoicepage.module.css"

const InvoicePage = () => {
  return (
    <div className={styles.container}>
        <Header />
        <Invoice />
        <Footer />
    </div>
  )
}

export default InvoicePage