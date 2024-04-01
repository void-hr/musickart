import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ProductDetail from "../../components/ProductDetail/ProductDetail"
import styles from "./detailpage.module.css"
const DetailPage = () => {
  return (
    <div className={styles.container}>
        <Header/>
        <ProductDetail />
        <Footer />
    </div>
  )
}

export default DetailPage