import axios from 'axios';

export const addItemsToCart = async( productId, quantity) => {

    try {
        const token = localStorage.getItem('token')
        const value = {
            productId,
            quantity
        }
        if(token) {
            const header = { headers : {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token
            }}
            const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/cart/add`, value, header);
            if(data.status === "SUCCESS") {
                return data;
        }  
       }else {
        throw new Error("Something Unexpected Happened")
       }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.status === "ERROR" ? error?.response?.data?.message :"Something Went Wrong";
        throw new Error(customErrorMessage);
    }

}

export const getCartItems = async() => {
    try {
        const token = localStorage.getItem('token')
        if(token) {
            const header = { headers : {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token
            }}
            const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/cart/all`, header);
            if(data.status === "SUCCESS") {
                return data;
        }  
       }else {
        throw new Error("Something Unexpected Happened")
       }

    } catch (error) {
        const customErrorMessage = error?.response?.data?.status === "ERROR" ? error?.response?.data?.message :"Something Went Wrong";
        throw new Error(customErrorMessage);
    }
}