import styles from "./invoicedetail.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import SubNavbar from "../SubNavbar/SubNavbar";
import backarrow from "../../assets/icons/backarrow.svg";
import { useState } from "react";

const InvoiceDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [userName, setUserName] = useState(localStorage.getItem("user") ? localStorage.getItem("user") : "")

    return (

        <div className={styles.container}>
            <button
                className={styles.mobile_redirect_button}
                type="button"
                onClick={() => navigate("/")}
            >
                <img src={backarrow} alt="backarrow" />
            </button>
            <SubNavbar model={"Invoices"} />
            <button
                className={styles.redirect_button}
                type="button"
                onClick={() => navigate("/cart")}
            >
                Back to Cart
            </button>
            <div className={styles.heading}>
                <h1>Invoice</h1>
            </div>
            <div className={styles.checkout_container}>
                <div className={styles.checkout_container_left}>
                    <div className={styles.checkout_address}>
                        <label>1. Delivery address</label>
                        <span className={styles.billing_address}>
                            <p> {userName} </p>
                            <p> {state?.invoice.billing_address}</p>
                        </span>
                    </div>
                    <div className={styles.checkout_payment_method}>


                        <label> 2. Payment Method</label>
                        <div className={styles.payment_method_container}>
                            <select className={styles.select_payment} disabled>
                                <option defaultChecked hidden >    {state?.invoice.payment_method} </option>
                            </select>

                        </div>
                    </div>
                    <div className={styles.checkout_review_item}>
                        <label> 3. Review Items and Delivery </label>

                        <div className={styles.review_item_data}>
                            <div className={styles.image_container}>
                                {state?.invoice.items.map((elem, idx) => (
                                    <img src={elem.images} key={idx} alt="productimage" />
                                ))}
                            </div>
                            {state?.invoice?.items.map((elem, idx) => (
                                <div key={idx} className={styles.cart_item_details}>
                                    <span>
                                        <p>{elem.model}</p>
                                        <p>Colour : {elem.colour}</p>
                                        <p>{elem.availability}</p>
                                    </span>
                                </div>
                            ))}
                            <p className={styles.estimated_para}>
                                Estimated delivery : Monday — FREE Standard Delivery
                            </p>
                        </div>
                        <div></div>
                        <div className={styles.mobile_order_summary}>
                            <span className={styles.order_summary_container}>
                                <p className={styles.place_order_summary}>Order Summary</p>
                                <span className={styles.order_summary_items}>
                                    <p>Items :</p>
                                    <p>&#x20b9; {(state?.invoice.bill - 45).toFixed(2) ?? 0}</p>
                                </span>
                                <span className={styles.order_summary_delivery}>
                                    <p>Delivery :</p>
                                    <p>&#x20b9; {(45).toFixed(2) ?? 0}</p>
                                </span>
                            </span>
                            <span className={styles.order_summary_total}>
                                <p>Order Total : </p>
                                <p>&#x20b9; {state?.invoice.bill.toFixed(2) ?? 0}</p>
                            </span>
                        </div>
                    </div>
                </div>
                    <div className={styles.checkout_container_right}>
                        <div className={styles.place_your_order_right}>
                            <div className={styles.place_order_container}>


                                <span className={styles.order_summary_container}>
                                    <p className={styles.place_order_summary}>Order Summary</p>
                                    <span className={styles.order_summary_items}>
                                        <p>Items</p>
                                        <p>&#x20b9; {(state?.invoice.bill - 45).toFixed(2) ?? 0}</p>
                                    </span>
                                    <span className={styles.order_summary_delivery}>
                                        <p>Delivery</p>
                                        <p>&#x20b9; {(45).toFixed(2) ?? 0}</p>
                                    </span>
                                </span>
                                <span className={styles.order_summary_total}>
                                    <p>Order Total : </p>
                                    <p> &#x20b9; {state?.invoice.bill.toFixed(2) ?? 0} </p>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>
        </div>




    )
}

export default InvoiceDetails