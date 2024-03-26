import styles from "./gridview.module.css"
// https://i.imgur.com/DmgGxTL.jpg
const GridView = ({data}) => {
  return (
    <div className={styles.container}>
        {
            data?.map((elem, idx)=> 
                <div className={styles.product_container}>
                <div className={styles.product_image}>
                    <img src={elem?.image} alt={elem.name} />
                </div>
                <div className={styles.product_info}>
                    <p className={styles.name_para}> {elem.name}</p>
                    <p className={styles.price_para}>Price - &#x20b9; {elem.price} </p>
                    <p className={styles.color_type_para}>  {elem.color} | {elem.type}</p>
                </div>
            </div>
            )
        }
        {/* <div className={styles.product_container}>
            <div className={styles.product_image}>
                <img src={"https://i.imgur.com/DmgGxTL.jpg"} alt="headphone" />
            </div>
            <div className={styles.product_info}>
                <p> boAt Rockerz 551ANC</p>
                <p>Price - </p>
                <p> Colour | Headphone Type</p>
            </div>
        </div> */}
    </div>
  )
}

export default GridView