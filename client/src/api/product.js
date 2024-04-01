import axios from "axios"

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/product/allproducts`)
    return data?.products;
  } catch (error) {
    throw new Error(error)
  }
}
