import styles from "./gridview.module.css";
import cartlogo from "../../assets/icons/cartlogo.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import {addItemsToCart} from "../../api/orders";
import toast from "react-hot-toast";
const GridView = ({ products }) => {
  const navigate = useNavigate();
  const { totalItems, setTotalItems } = useCart();
  const addToCart = async(e, id) => {
    e.stopPropagation();
    try {
      const res = await addItemsToCart(id);
      setTotalItems(prev => prev + 1);
      toast.success("Added to cart");
    } catch (error) {
        console.log(error.message);
    }
  };
  return (
    <div className={styles.container}>
      {products?.map((elem, idx) => (
        <div key={elem?._id} className={styles.product_container} onClick={() => navigate(`/details/${elem?._id}`, { state: { data: elem } })}>
          <div className={styles.product_image}>
            <img src={elem?.images[0]} alt={elem.name}  className={styles.primary_image}/>
            <img src={cartlogo} alt="cart" className={styles.cart_logo} onClick={(e) => addToCart(e,elem._id)}/>
          </div>
          <div className={styles.product_info} >
            <p className={styles.name_para}>  {elem?.model}</p>
            <p className={styles.price_para}>Price - &#x20b9; {elem?.price} </p>
            <p className={styles.color_type_para}>
              {elem?.colour} | {elem?.type}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;
