import styles from "./listview.module.css"
import cartlogo from "../../assets/icons/cartlogo.png"
import { useNavigate } from "react-router-dom";

const ListView = ({products}) => {
  const navigate = useNavigate();

  console.log(products)
  return (
    <div className={styles.container}>
    {
        products?.map((elem, idx)=> 
            <div key ={elem._id} className={styles.product_container}>
            <div className={styles.product_image}>
                <img src={elem?.images[0]} alt={elem?.model} />
                <img src={cartlogo} alt="cart" />
            </div>
            <div className={styles.product_info}>
                <p className={styles.name_para}> {elem?.model}</p>
                <p className={styles.price_para}>Price - &#x20b9; {elem?.price} </p>
                <p className={styles.color_type_para}>  {elem?.colour} | {elem?.type}</p>
                <p className={styles.description_para}> {elem?.description}</p>
               <button type="button" onClick={() => navigate(`/details/${elem?._id}`, {
                state: {data: elem
      }, 
      })} className={styles.detail_button}>Details</button>
            </div>
        </div>
        )
    }
  
</div>

  )
}

export default ListView