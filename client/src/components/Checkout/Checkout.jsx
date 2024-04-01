import { useLocation, useNavigate } from "react-router-dom";
import SubNavbar from "../SubNavbar/SubNavbar";
import styles from "./checkout.module.css";
import backarrow from "../../assets/icons/backarrow.svg";
import { useState } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userName, setUserName] = useState(
    localStorage.getItem("user") ? localStorage.getItem("user") : "Test User"
  );

  console.log(state?.bill);
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
        onClick={() => navigate("/cart")}
      >
        Back to Cart
      </button>
      <div className={styles.heading}>
        <h1>Checkout</h1>
      </div>
      <div className={styles.checkout_container}>
        <div className={styles.checkout_container_left}>
          <div className={styles.checkout_address}>
            <label>1. Delivery address</label>
            <span>
              <p> {userName} </p>
              <textarea className={styles.checkout_textarea}></textarea>
            </span>
          </div>
          <div className={styles.checkout_payment_method}>
            <label> 2. Payment Method</label>
            <select name="" id="" className={styles.select_payment}>
              <option defaultChecked hidden>
                Payment Method
              </option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Pay On Delivery">Pay On Delivery</option>
            </select>
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
                  <p>&#x20b9; {(state?.bill - 45).toFixed(2)}</p>
                </span>
                <span className={styles.order_summary_delivery}>
                  <p>Delivery :</p>
                  <p>&#x20b9; {(45).toFixed(2)}</p>
                </span>
              </span>
              <span className={styles.order_summary_total}>
                <p>Order Total : </p>
                <p>&#x20b9; {state?.bill.toFixed(2)}</p>
              </span>
              <button className={styles.place_your_order_button}>
                Place your order
              </button>
            </div>
          </div>
          <div className={styles.place_your_order_left}>
            <button className={styles.place_your_order_button}>
              Place your order
            </button>
            <span>
              <p>Order Total : &#x20b9; {state?.bill.toFixed(2)}</p>
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
              <button className={styles.place_your_order_button}>
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
                  <p>&#x20b9; {(state?.bill - 45).toFixed(2)}</p>
                </span>
                <span className={styles.order_summary_delivery}>
                  <p>Delivery</p>
                  <p>&#x20b9; {(45).toFixed(2)}</p>
                </span>
              </span>
              <span className={styles.order_summary_total}>
                <p>Order Total : </p>
                <p> &#x20b9; {state?.bill.toFixed(2)} </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
