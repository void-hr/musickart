import styles from "./productdetail.module.css";
import logo from "../../assets/icons/logo.png";
import cart from "../../assets/icons/cart.svg";
import backarrow from "../../assets/icons/backarrow.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.home_navbar}>
        <div className={styles.navbar_left}>
          <span className={styles.navbar_logo}>
            <img src={logo} alt="logo" />
            <h1>Musicart</h1>
          </span>
          <p>Home / {state?.data?.model}</p>
        </div>
        <div className={styles.navbar_right}>
          <button type="button" className={styles.view_cart_button}>
            <img src={cart} alt="cart" />
            <p>View Cart</p>
          </button>
        </div>
      </div>
      <button
        className={styles.redirect_button}
        type="button"
        onClick={() => navigate("/")}
      >
        Back to Products
      </button>
      <button
        className={styles.mobile_redirect_button}
        type="button"
        onClick={() => navigate("/")}
      >
        <img src={backarrow} alt="backarrow" />
      </button>
      <button type="button" className={styles.mobile_buy_now}>
        Buy Now
      </button>

      <div className={styles.mobile_carousel}>
        <Carousel emulateTouch showThumbs={false} showStatus={false}>
          {state?.data?.images.map((elem, idx) => (
            <div key={idx}>
              <img alt="headphone" src={elem} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.product_detail_container}>
        <h1 className={styles.product_description}>
          {state?.data?.description}
        </h1>

        <div className={styles.detailed_container}>
          {/* images */}
          <div className={styles.product_images}>
            <div className={styles.primary_image}>
              <img src={state?.data?.images[0]} alt={state?.data?.model} />
            </div>
            <div className={styles.secondary_images_container}>
              {state?.data?.images.slice(1, 4).map((elem, idx) => (
                <div key={idx} className={styles.secondary_image}>
                  <img src={elem} alt={state?.data?.model} />
                </div>
              ))}
            </div>
          </div>

          {/* details part */}
          <div className={styles.product_all_details}>
            <h1>{state?.data?.model}</h1>
            <div className={styles.review_container}>
              <div className={styles.rating}></div>
              <div>( {state?.data?.review} Customer Reviews)</div>
            </div>
            <p className={styles.mobile_product_description}>
              {state?.data?.description}
            </p>
            <h2 className={styles.price_para}>
              Price - &#x20b9; {state?.data?.price}
            </h2>

            <p className={styles.colour_type}>
              {" "}
              {state?.data?.colour + " | " + state?.data?.type} Headphone
            </p>

            <p className={styles.about_para}>About this item</p>
            <ul className={styles.about_list}>
              {state?.data?.about.map((elem, idx) => (
                <li key={idx}>{elem}</li>
              ))}
            </ul>
            <span className={styles.availability}>
              {" "}
              <p className={styles.availability_para}>Available</p>-{" "}
              {state?.data?.availability}{" "}
            </span>
            <span className={styles.brand}>
              {" "}
              <p className={styles.brand_para}>Brand</p> - {state?.data?.brand}{" "}
            </span>
            <div className={styles.button_group}>
              <button type="button" className={styles.add_to_cart}>
                Add to cart
              </button>
              <button type="button" className={styles.buy_now}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
