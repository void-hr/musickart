import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import Home from "../../components/Home/Home"
import styles from "./homepage.module.css"

const HomePage = () => {
  return (
    <div className={styles.container}> 
        <Header />
        <div className={styles.home}>
        <Home/>
        </div>
        <Footer />
    </div>
  )
}

export default HomePage