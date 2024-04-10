import styles from "./header.module.css"
import telephone from "../../assets/icons/telephone.svg"
import logo from "../../assets/icons/logo.png";
import search from "../../assets/icons/search.png";
import { useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { SearchContext } from "../../Context/SearchContext";
const Header = () => {

  const { pathname } = useLocation();
  const { isLogged, logout } = useContext(AuthContext);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();  
  const handleSearch = (e) => {
    setSearchQuery((prevFilters) => ({
      ...prevFilters,
      search: e.target.value,
    }))
    { pathname.includes("/details") || pathname.includes("/cart") ? navigate("/") : null}
  }
  return (
    <>

      <header className={styles.header}>
        <span className={styles.header_span}>
          <img src={telephone} alt="telephone" />
          <p> 912121131313</p>
        </span>
        <p className={styles.header_para}> Get 50% off on selected items | Shop Now</p>
        <span className={styles.header_span}>
          {isLogged ? <Link to="/" onClick={() => logout()}>Logout</Link> :

            (
              <>
                <Link to="/login">Login</Link> |
                <Link to="/register">Signup</Link>
              </>
            )
          }
        </span>
      </header>

      {
        pathname === "/" || pathname.includes("/details") || pathname === "/cart" ?
          <header className={styles.mobile_search_header}>
            <div className={styles.mobile_header_search_container}>
              <input type="text" value={searchQuery?.search } placeholder="Search MusicKart" name="search" onChange={handleSearch}/>
              <img src={search} alt="search" />
            </div>
          </header>

          :
          <header className={styles.mobile_header}>
            <span>
              <img src={logo} alt="logo" />
              <h1>MusicCart</h1>
            </span>
          </header>

      }

    </>

  )
}

export default Header