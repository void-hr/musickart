import logo from "../../assets/icons/logo.png";
import styles from "./subnavbar.module.css"
import { useLocation } from "react-router-dom";
const SubNavbar = () => {
  const {pathname} = useLocation();
  return (
    <div className={styles.home_navbar}>
        <div className={styles.navbar_left}>
          <span className={styles.navbar_logo}>
            <img src={logo} alt="logo" />
            <h1>Musicart</h1>
          </span>
          <p>Home / {pathname.slice(1)}</p>
        </div>
        <div className={styles.navbar_right}></div>
      </div>
  )
}

export default SubNavbar