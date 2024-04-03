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
import { useNavigate } from "react-router-dom";
import Feedback from "../Feedback/Feedback";
const selectOptions = [
  { 
    name: 'type', 
    options: [
      { display: 'Featured', value: 'Featured' },
      { display: 'In-ear headphone', value: 'In Ear' },
      { display: 'On-ear headphone', value: 'On Ear' },
      { display: 'Over-ear headphone', value: 'Over Ear' }
    ], 
    defaultValue: "Headphone Type" 
  },
  { 
    name: 'company', 
    options: [
      { display: 'Featured', value: 'Featured' },
      { display: 'JBL', value: 'JBL' },
      { display: 'Sony', value: 'SONY' },
      { display: 'Boat', value: 'BOAT' },
      { display: 'Zebronics', value: 'ZEBRONICS' },
      { display: 'Marshall', value: 'MARSHALL' },
      { display: 'Ptron', value: 'PTRON' }
    ], 
    defaultValue: "Company" 
  },
  { 
    name: 'colour', 
    options: [
      { display: 'Featured', value: 'Featured' },
      { display: 'Black', value: 'Black' },
      { display: 'White', value: 'White' },
      { display: 'Blue', value: 'Blue' },
      { display: 'Brown', value: 'Brown' }
    ], 
    defaultValue: "Colour" 
  },
  { 
    name: 'price', 
    options: [
      { display: 'Featured', value: 'Featured' },
      { display: '₹0 - ₹1000', value: '1' },
      { display: '₹1000 - ₹10000', value: '2' },
      { display: '₹10000 - ₹20000', value: '3' }
    ], 
    defaultValue: "Price" 
  },
];


const Home = () => {
  const [view, setView] = useState(0);
  const [products, setProducts] = useState([]);
  const [ filters, setFilters ] = useState({});
  const [ showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, [filters])


  const fetchAllProducts = async () => {
    try {
      const res = await fetchProducts(filters);
      setProducts(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = () => {
    navigate("/cart")
  }

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name] : value !== "Featured" ? value : "",
    }))
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
          name="search"
          onChange={handleFilter}
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

            {selectOptions.map((select, idx) => (
              <select key={idx} name={select.name} onChange={handleFilter} className={styles.custom_select}>
                <option hidden defaultValue>{select.defaultValue}</option>
                {select.options.map((option, i) => (
                  <option key={i} value={option.value}>{option.display}</option>
                ))}
              </select>
            ))}


          </div>
        </div>
        <div className={styles.filter_right}>
          <select name="sort" className={styles.sort_select} onChange={handleFilter}>
            <option value="featured" defaultChecked hidden>Sort by: Featured</option>
            <option value="lowest">Price: Lowest</option>
            <option value="highest">Price: Highest</option>
            <option value="az">Name: (A-Z)</option>
            <option value="za">Name: (Z-A)</option>

          </select>
        </div>

        <div className={styles.mobie_filter_right}>
          <select name="sort" className={styles.sort_select} onChange={handleFilter}>
            <option value="featured" defaultChecked hidden>Sort By</option>
            <option value="lowest">Price: Lowest</option>
            <option value="highest">Price: Highest</option>
            <option value="az">Name: (A-Z)</option>
            <option value="za">Name: (Z-A)</option>
          </select>
        </div>
      </div>


      <div className={styles.product_container}>
        {view === 0 ? <GridView products={products} /> : <ListView products={products} />}
        <div className={styles.feedback}>
          <div className={styles.feeback_in} onClick={()=> setShowFeedback(!showFeedback)}>
          <img src={chatbot} alt="chatbot" />
          </div>
          { showFeedback && <div className={styles.modal}>
          <Feedback setShowFeedback={setShowFeedback}/>
          </div>}
        </div>
      </div>

    </div>
  );
};

export default Home;
