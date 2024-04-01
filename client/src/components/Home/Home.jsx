import styles from "./home.module.css";
import logo from "../../assets/icons/logo.png";
import bannergirl from "../../assets/images/bannergirl.png";
import search from "../../assets/icons/search.png";
import listview from "../../assets/icons/listview.svg";
import gridview from "../../assets/icons/gridview.svg";
import chatbot from "../../assets/icons/chatbot.svg";
import { useEffect, useState } from "react";
import GridView from "../GridView/GridView";
import ListView from "../ListView/ListView";
import { fetchProducts } from "../../api/product";
import SubNavbar from "../SubNavbar/SubNavbar";
const headphoneType = [];
const company = [];
const colour = [];
const price = [];

const Home = () => {
  const [view, setView] = useState(0);
  const [ products, setProducts ] = useState([]);

  useEffect(()=> {
    fetchAllProducts();
  },[])


  const fetchAllProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = () => {
    
  }
  return (
    <div className={styles.container}>
     
      <SubNavbar />
      <div className={styles.banner}>
        <div className={styles.banner_content}>
        <p className={styles.banner_para}>
          Grab upto 50% off on Selected headphones
        </p>
        <button type="button" className={styles.mobile_buy_now_button} onClick={handleBuy}>Buy Now</button>
        </div>
       
        <div className={styles.banner_girl_container}>
          <img src={bannergirl} alt="banner_girl" />
        </div>
      </div>
      <div className={styles.search_bar}>
        <img src={search} alt="search" className={styles.search_bar_image} />
        <input
          type="text"
          className={styles.search_bar_input}
          placeholder="Search by Product Name"
        />
      </div>


      <div className={styles.filter_navbar}>
        <div className={styles.filter_left}>
          <span className={styles.view}>
            <img
              src={gridview}
              alt="grid_view"
              className={
                view === 0 ? styles.view_icons_active : styles.view_icons
              }
              onClick={() => setView(0)}
            />
            <img
              src={listview}
              alt="list_view"
              className={
                view === 1 ? styles.view_icons_active : styles.view_icons
              }
              onClick={() => setView(1)}
            />
          </span>
          <div className={styles.filter_group}>
          <select name="Headphone type" className={styles.custom_select}>
            <option value="headphone type" hidden defaultValue={true}>
              Heaphone Type
            </option>
            <option value="featured">Featured</option>
            <option value="in-ear">In-ear headphone</option>
            <option value="on-ear">On-ear headphone</option>
            <option value="over-ear">Over-ear headphone</option>
          </select>

          <select name="Company" className={styles.custom_select}>
            <option value="Company" hidden defaultValue={true}>
              Company
            </option>
            <option value="featured">Featured</option>
            <option value="in-ear">JBL</option>
            <option value="on-ear">Sony</option>
            <option value="over-ear">Boat</option>
            <option value="over-ear">Zebronics</option>
            <option value="over-ear">Marshall</option>
            <option value="over-ear">Ptron</option>
          </select>

          <select name="Colour" className={styles.custom_select}>
            <option value="Colour" hidden defaultValue={true}>
              Colour
            </option>
            <option value="featured">Featured</option>
            <option value="in-ear">Black</option>
            <option value="on-ear">White</option>
            <option value="over-ear">Blue</option>
            <option value="over-ear">Brown</option>
          </select>

          <select name="Price" className={styles.custom_select}>
            <option value="headphone type" hidden defaultValue={true}>
              Price
            </option>
            <option value="featured">Featured</option>
            <option value="in-ear"> &#x20b9;0 - &#x20b9;1000</option>
            <option value="on-ear">&#x20b9;1000 - &#x20b9;10000</option>
            <option value="over-ear">&#x20b9;10000 - &#x20b9;20000</option>
          </select>
        </div>
        </div>
        <div className={styles.filter_right}>
          <select name="sort" className={styles.sort_select}>
            <option value="featured" defaultChecked hidden>Sort by: featured</option>
            <option value="featured">Featured</option>
            <option value="featured">Featured</option>
            <option value="featured">Featured</option>
          </select>
          </div>

          <div className={styles.mobie_filter_right}>
          <select name="sort" className={styles.sort_select}>
            <option value="featured" defaultChecked hidden>Sort By</option>
            <option value="featured">Sort by: Featured</option>
            <option value="featured">Featured</option>
            <option value="featured">Featured</option>
          </select>
          </div>
        <div className={styles.feedback}>
          <img src={chatbot} alt="chatbot" />
        </div>
      </div>


      <div className={styles.product_container}>
      { view === 0 ? <GridView products={products} /> : <ListView products={products}/>}
      </div>
    </div>
  );
};

export default Home;
