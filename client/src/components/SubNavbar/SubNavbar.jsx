import logo from "../../assets/icons/logo.png";
import styles from "./subnavbar.module.css"
import cart from "../../assets/icons/cart.svg";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import { useCart } from "../../Context/CartContext"
const SubNavbar = ({ model }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, isLogged } = useContext(AuthContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState("G")
  const [userName, setUserName] = useState(localStorage.getItem("user") ?? "")

  const { totalItems } = useCart();
  useEffect(() => {
    if (localStorage.getItem(
      "user"
    )) {
      const name = localStorage?.getItem("user");
      const words = name.split(' ');
      if (words.length === 1) {
        setUser(words[0].charAt(0));
      } else {
        setUser(words[0].charAt(0) + words[1].charAt(0));
      }
    }
  }, [totalItems])
  return (
    <div className={styles.home_navbar}>
      <div className={styles.navbar_left}>
        <span className={styles.navbar_logo}>
          <img src={logo} alt="logo" />
          <h1>Musicart</h1>
        </span>
        {pathname === "/" ?
          <>
            <div className={styles.links}>
              <Link to="/"> Home</Link>
              {isLogged && <Link to="/invoices"> Invoices</Link>}
            </div>

          </>
          :
          <>
            <p className={styles.route}>Home / {model ? model : pathname === "/cart" ? "My Cart" : pathname.slice(1)}</p>
            <div className={styles.navbar_right}></div>
          </>
        }
      </div>
      {isLogged && <div className={styles.navbar_right}>
        {pathname != "/cart" && <button type="button" className={styles.view_cart_button} onClick={() => navigate("/cart")}>
          <img src={cart} alt="cart" />
          <p>View Cart {totalItems}</p>
        </button>}

        {pathname === "/" && <div className={styles.profile} >
          <div onClick={() => setShowProfileMenu(!showProfileMenu)}> {user}</div>
          {showProfileMenu && <div className={styles.menu} >
            <p onClick={() => setShowProfileMenu(!showProfileMenu)}>{userName}</p>
            <p onClick={() => { setShowProfileMenu(!setShowProfileMenu); logout() }}>Logout</p> </div>}
        </div>}
      </div>}
    </div>
  )
}

export default SubNavbar