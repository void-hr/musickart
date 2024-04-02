import { useNavigate } from "react-router-dom"
import SubNavbar from "../SubNavbar/SubNavbar"
import invoice from "../../assets/icons/invoiceedit.svg"
import backarrow from "../../assets/icons/backarrow.svg";

import styles from "./invoice.module.css"
import { useEffect, useLayoutEffect, useState } from "react";
import { fetchInvoice } from "../../api/orders";
const Invoice = () => {
    const navigate = useNavigate();
  const [ invoices, setInvoices] = useState();
    useLayoutEffect(() => {

      const allInvoices = async() => {
          try {
              const res = await fetchInvoice();
              setInvoices(res)
          } catch (error) {
            toast.error("Something went wrong")
          }
      }

      allInvoices();

    }, [])
    
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

  {invoices?.map((elem) =>  <div className={styles.invoices} key={elem._id}>
        <div className={styles.invoices_left}>
            <img src={invoice} alt="invoicelogo" />
            <div className={styles.invoice_info}>
                <p className={styles.user_name}></p>
                <p className={styles.del_address}>{elem.billing_address}</p>
            </div>
        </div>
        <div className={styles.invoices_right}>
            <button className={styles.view_invoice} onClick={() => {navigate(`/invoice/${elem._id}`, {state : {
              invoice: elem,
            }})}}>
                View Invoice
            </button>
        </div>

    </div>) }
    </div>
  )
}

export default Invoice