import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import InvoiceDetails from "../../components/InvoiceDetails/InvoiceDetails"
import styles from "./invoicedetailpage.module.css"
const InvoiceDetailPage = () => {
    return (
        <div className={styles.container}>
            <Header />
            <InvoiceDetails />
            <Footer />

        </div>
    )
}

export default InvoiceDetailPage