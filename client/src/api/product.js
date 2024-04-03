import axios from "axios"

export const fetchProducts = async (filters) => {
  try {
    const { type, company, colour, price, sort, search}  = filters ?? {};
    const queryString = `?type=${type ?? ''}&company=${company ?? ''}&colour=${colour ?? ''}&price=${price ?? ''}&sort=${sort ?? ''}&search=${search ?? ''}`;
    const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/product/allproducts${queryString}`)
    return data?.products;
  } catch (error) {
    const customErrorMessage = error?.response?.data?.status === "ERROR" ? error?.response?.data?.message : "Something Went Wrong";
    throw new Error(customErrorMessage);
  }
}
