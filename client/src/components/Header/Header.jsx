import styles from "./header.module.css"
import telephone from "../../assets/icons/telephone.svg"
const Header = () => {
  return (
    <header className={styles.header}>
        <span className={styles.header_span}>
        <img src={telephone} alt="telephone" />
        <p> 912121131313</p>
        </span>
        <p className={styles.header_para}> Get 50% off on selected items | Shop Now</p>
        <span className={styles.header_span}>
        <a href="/login">Login</a> |
        <a href="/register">Signup</a>
        </span>
    </header>
  )
}

export default Header