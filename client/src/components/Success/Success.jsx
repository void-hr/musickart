import styles from "./success.module.css"
import logo from "../../assets/icons/logo.png"
import success from "../../assets/images/sucess.png"
import { useNavigate } from "react-router-dom"

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
        <div className={styles.music_logo}>
            <img src={logo} alt="logo" />
            <h1>MusickCart</h1>
        </div>
    <div className={styles.success_outer_container}>
        <div className={styles.success_container}>
            <div className={styles.success_content}>
            <img src={success} alt="celebration" />
            <h1>Order is placed successfully!</h1>
            <p>You  will be receiving a confirmation email with order details</p>
            <button type="button" onClick={()=> navigate("/")}>Go back to Home page</button>
            </div>
        </div>

        </div>
    </div>
  )
}

export default Success