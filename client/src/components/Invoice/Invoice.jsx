import { useNavigate } from "react-router-dom"
import SubNavbar from "../SubNavbar/SubNavbar"
import invoice from "../../assets/icons/invoiceedit.svg"
import backarrow from "../../assets/icons/backarrow.svg";

import styles from "./invoice.module.css"
const Invoice = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.container}>
         <button
        className={styles.mobile_redirect_button}
        type="button"
        onClick={() => navigate("/")}
      >
        <img src={backarrow} alt="backarrow" />
      </button>
    <SubNavbar />
    <button
        className={styles.redirect_button}
        type="button"
        onClick={() => navigate("/")}
      >
        Back to Products
      </button>

<div className={styles.heading}>
<img src={invoice} alt="invoicelogo" />
      <h1> My Invoices</h1>
</div>

    <div className={styles.invoices}>
        <div className={styles.invoices_left}>
            <img src={invoice} alt="invoicelogo" />
            <div className={styles.invoice_info}>
                <p className={styles.user_name}>agasfsa</p>
                <p className={styles.del_address}>agasfsa</p>
            </div>
        </div>
        <div className={styles.invoices_right}>
            <button className={styles.view_invoice}>
                View Invoice
            </button>
        </div>

    </div>
    </div>
  )
}

export default Invoice