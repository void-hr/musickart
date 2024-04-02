import styles from "./cart.module.css";
import SubNavbar from "../SubNavbar/SubNavbar";
import bagcart from "../../assets/icons/bagcart.svg";
import backarrow from "../../assets/icons/backarrow.svg";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addItemsToCart, getCartItems } from "../../api/orders";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const [sumValue, setSumValue] = useState(0);
  const [ cartId, setCardId]  = useState();
  const navigate = useNavigate();
  const handleQuantity = async (e, item) => {
    try {
      const { message } = await addItemsToCart(item.product, e.target.value);
      fetchAllCart();
      toast.success("Cart Updated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchAllCart();
  }, []);

  const fetchAllCart = async () => {
    try {
      const { cart } = await getCartItems();
      setCartItem(cart?.items);
      setSumValue(cart?.bill);
      setCardId(cart?._id);
    } catch (error) {
      toast.error("Error fetching cart");
    }
  };

  const handlePlaceOrder = () => {
        navigate("/checkout", { state : {
          cart : cartItem,
          bill : sumValue,
          id: cartId
        }})
  }
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
        <img src={bagcart} alt="invoicelogo" />
        <h1> My Cart</h1>
      </div>

      {cartItem?.length > 0 ? (
        <div className={styles.cart_total_items}>
          <div className={styles.cart_items}>
            <div className={styles.cart_item_detail}>
              {cartItem?.map((item) => (
                <div className={styles.cart_item_container} key={item.product}>
                  <div className={styles.cart_item_detail_left}>
                    <img src={item.images} alt={item.model} />
                    <span className={styles.cart_item_data}>
                      <label> {item.model} </label>
                      <p> {item.colour}</p>
                      <p>{item.availability}</p>
                    </span>
                  </div>

                  <span className={styles.cart_item_price}>
                    <label>Price</label>
                    &#x20b9; {item.price}
                  </span>

                  <span className={styles.cart_item_quantity}>
                    <label>Quantity</label>
                    <select
                      className={styles.quantity_select}
                      id="quantity"
                      onChange={(e) => handleQuantity(e, item)}
                      defaultValue={item.quantity}
                    >
                      {[...Array(8).keys()].map((value) => (
                        <option key={value} value={value + 1}>
                          {value + 1}
                        </option>
                      ))}
                    </select>
                  </span>
                  <span className={styles.cart_item_sum}>
                    <label>Total</label>
                    &#x20b9; {item.quantity * item.price}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.cart_item_total}>
              <p>
                {cartItem.length === 1
                  ? `${cartItem.length} Item`
                  : `${cartItem.length} Items`}
              </p>
              <p>
                &#x20b9;
                {sumValue}
              </p>
            </div>
          </div>
          <div className={styles.cart_bill}>
            <div className={styles.price_detail_container}>
              <div className={styles.price_details}>
                <p>PRICE DETAILS</p>
                <span className={styles.total_mrp}>
                  <p>Total MRP</p>
                  <p>&#x20b9; {sumValue}</p>
                </span>
                <span className={styles.discount}>
                  <p>Discount on MRP</p>
                  <p>&#x20b9; 0</p>
                </span>
                <span className={styles.convenience_fee}>
                  <p>Convenience Fee</p>
                  <p>&#x20b9; 45</p>
                </span>
                <span className={styles.total_amount}>
                  <p>Total Amount</p>
                  <p>&#x20b9; {sumValue + 45}</p>
                </span>
                <button className={styles.place_order}>Place Order</button>
              </div>
            </div>
          </div>

       
        </div>
      ) : (
        <div className={styles.desk_empty_cart}>
          <h1>Your Cart is Empty </h1>
          <p> Add items to your cart and visit again</p>
        </div>
      )}
    

<div className={styles.mobile_cart_container}>
  {cartItem?.length > 0 ? (
    <>
      {cartItem.map((item) => (
        <div className={styles.mobile_cart_card} key={item.product}>
          <div className={styles.cart_item_detail_left}>
            <img src={item.images} alt={item.model} />
            <span className={styles.cart_item_data}>
              <label>{item.model}</label>
              <p className={styles.item_price}> &#x20b9; {item.price}</p>
              <p>{item.colour}</p>
              <p>{item.availability}</p>
              <span className={styles.item_total}>
                <p>Total</p>
                <p>&#x20b9; {item.quantity * item.price}</p>
              </span>
            </span>
          </div>
        </div>
      ))}
      <div className={styles.mobile_button_container}>
        <span className={styles.convenience_fee}>
          <p>Convenience Fee</p>
          <p>&#x20b9; 45</p>
        </span>
        <span className={styles.final_amount}>
          <p>Total Amount</p>
          <p>&#x20b9; {sumValue + 45}</p>
        </span>
        <button type="button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </>
  ) : (
    <div className={styles.empty_cart}>
      <h1>Your Cart is Empty</h1>
      <p>Add items to your cart and visit again</p>
    </div>
  )}
</div>

    </div>
  );
};

export default Cart;
