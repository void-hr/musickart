import styles from "./footer.module.css";
import cart from "../../assets/icons/cartlogo.svg";
import home from "../../assets/icons/homelogo.svg";
import logoutLogo from "../../assets/icons/logoutlogo.svg";
import login from "../../assets/icons/loginLogo.svg";
import { useCart } from "../../Context/CartContext";
import invoice from "../../assets/icons/invoice.svg";
import { useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLogged, logout } = useContext(AuthContext);
  const { totalItems } = useCart();
  const handleLogout = () => {
    navigate("/");
    logout();
  }
  return (
    <>
      {pathname === "/login" || pathname === "/register" ? (
        <>
          <footer className={styles.footer}>
            <p className={styles.footer_para}>Musicart | All rights reserved</p>
          </footer>
          <footer className={styles.mobile_footer_auth}>
            <p className={styles.footer_para}>Musicart | All rights reserved</p>
          </footer>
        </>
      ) : (
        <>
         <footer className={styles.footer}>
            <p className={styles.footer_para}>Musicart | All rights reserved</p>
          </footer>
          <footer className={styles.mobile_footer}>
            <div className={ pathname === "/" ? `${styles.mobile_navbar}  ${styles.mobile_active}` :styles.mobile_navbar} onClick={() => navigate("/")} >
              <img src={home} alt="home" />
              <p className={styles.nav_items_name}>Home</p>

            </div>
            <div  className={ pathname === "/cart" ? `${styles.mobile_navbar}  ${styles.mobile_active}` : styles.mobile_navbar} onClick={() => isLogged ? navigate("/cart") : navigate("/login")} >
              <img src={cart} alt="cart" />
              <p className={styles.nav_items_name}>Cart</p>
              <div className={styles.mobile_cart_items}>{totalItems ? totalItems : 0}</div>
            </div>
           {isLogged && <div className={ pathname === "/invoices" ? `${styles.mobile_navbar}  ${styles.mobile_active}` : styles.mobile_navbar}  onClick={() =>navigate("/invoices")}>
              <img src={invoice} alt="invoice" />
              <p className={styles.nav_items_name}>Invoice</p>
            </div>}
            <div className={styles.mobile_navbar} onClick={() => isLogged ?  handleLogout() : navigate("/login")}>
              <img src={isLogged ? login : logoutLogo} alt="logout" />
              <p className={styles.nav_items_name}> {isLogged ? "Logout" : "Login"}</p>
            </div>
          </footer>
        </>
      )}
    </>
  );
};

export default Footer;
