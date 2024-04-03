import { useLocation, useNavigate } from "react-router-dom";
import SubNavbar from "../SubNavbar/SubNavbar";
import styles from "./checkout.module.css";
import backarrow from "../../assets/icons/backarrow.svg";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addInvoice } from "../../api/orders";
import { cleanCart } from "../../api/orders";

import toast from "react-hot-toast";
import { useCart } from "../../Context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userName, setUserName] = useState(
    localStorage.getItem("user") ? localStorage.getItem("user") : "Test User"
  );
  const { totalItems , setTotalItems} = useCart();



  const validationSchema = Yup.object().shape({
    address: Yup.string().required("* Address is required"),
    paymentMethod: Yup.string().required("* Payment method is required"),
  });
  const handleOrder = async (values) => {
    try {
      const res = await addInvoice({ cart: state?.cart, billingAddress: values.address, paymentMethod: values.paymentMethod, bill: state?.bill });
      const emptyCart = await cleanCart(state?.id)
      navigate("/success")
      setTotalItems(0);
      toast.success("Order Placed")
    } catch (error) {
      toast.error("Oops")
    }

  }
  return (
    <Formik
      initialValues={{ address: "", paymentMethod: "" }}
      validationSchema={validationSchema}
      onSubmit={(value, { resetForm }) => handleOrder(value, { resetForm })}
    >
      {(formik) => (
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
            onClick={() => navigate("/cart")}
          >
            Back to Cart
          </button>
          <div className={styles.heading}>
            <h1>Checkout</h1>
          </div>
          <Form className={styles.checkout_container}>
            <div className={styles.checkout_container_left}>
              <div className={styles.checkout_address}>
                <label>1. Delivery address</label>
                <span>
                  <p> {userName} </p>
                  <textarea id="address" className={formik.errors.address ? ` ${styles.checkout_textarea} ${styles.form_error}` : styles.checkout_textarea}
                    value={formik.values.address}
                    onChange={formik.handleChange}></textarea>
                  {formik.errors.address && <p className={styles.error_para}>{formik.errors.address}</p>}
                </span>
              </div>
              <div className={styles.checkout_payment_method}>



                <label> 2. Payment Method</label>
                <div className={styles.payment_method_container}>
                  <select id="paymentMethod" className={formik.errors.paymentMethod ? ` ${styles.select_payment} ${styles.form_error}` : styles.select_payment}
                    value={formik.values.paymentMethod}
                    onChange={formik.handleChange}>
                    <option defaultChecked hidden>
                      Payment Method
                    </option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                    <option value="Pay On Delivery">Pay On Delivery</option>
                  </select>

                  {formik.errors.paymentMethod && <p className={styles.error_para}>{formik.errors.paymentMethod}</p>}
                </div>
              </div>
              <div className={styles.checkout_review_item}>
                <label> 3. Review Items and Delivery </label>

                <div className={styles.review_item_data}>
                  <div className={styles.image_container}>
                    {state?.cart?.map((elem, idx) => (
                      <img src={elem.images} key={idx} alt="productimage" />
                    ))}
                  </div>
                  {state?.cart.map((elem, idx) => (
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
                      <p>&#x20b9; {(state?.bill - 45).toFixed(2) ?? 0}</p>
                    </span>
                    <span className={styles.order_summary_delivery}>
                      <p>Delivery :</p>
                      <p>&#x20b9; {(45).toFixed(2) ?? 0}</p>
                    </span>
                  </span>
                  <span className={styles.order_summary_total}>
                    <p>Order Total : </p>
                    <p>&#x20b9; {state?.bill.toFixed(2) ?? 0}</p>
                  </span>
                  <button type="button" className={styles.place_your_order_button} onClick={formik.handleSubmit} >
                    Place your order
                  </button>
                </div>
              </div>
              <div className={styles.place_your_order_left}>
                <button type="button" className={styles.place_your_order_button} onClick={formik.handleSubmit}>
                  Place your order
                </button>
                <span>
                  <p>Order Total : &#x20b9; {state?.bill.toFixed(2) ?? 0}</p>
                  <p>
                    By placing your order, you agree to Musicart privacy notice and
                    conditions of use.
                  </p>
                </span>
              </div>
            </div>
            <div className={styles.checkout_container_right}>
              <div className={styles.place_your_order_right}>
                <div className={styles.place_order_container}>
                  <button type="button" className={styles.place_your_order_button} onClick={formik.handleSubmit}>
                    Place your order
                  </button>
                  <span>
                    <p className={styles.place_order_para}>
                      By placing your order, you agree to Musicart privacy notice
                      and conditions of use.
                    </p>
                  </span>

                  <span className={styles.order_summary_container}>
                    <p className={styles.place_order_summary}>Order Summary</p>
                    <span className={styles.order_summary_items}>
                      <p>Items</p>
                      <p>&#x20b9; {(state?.bill - 45).toFixed(2) ?? 0}</p>
                    </span>
                    <span className={styles.order_summary_delivery}>
                      <p>Delivery</p>
                      <p>&#x20b9; {(45).toFixed(2) ?? 0}</p>
                    </span>
                  </span>
                  <span className={styles.order_summary_total}>
                    <p>Order Total : </p>
                    <p> &#x20b9; {state?.bill.toFixed(2) ?? 0} </p>
                  </span>
                </div>
              </div>
            </div>
          </Form>
        </div>)}
    </Formik>
  );
};

export default Checkout;
