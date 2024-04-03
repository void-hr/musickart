import axios from 'axios';

export const addItemsToCart = async (productId, quantity) => {

    try {
        const token = localStorage.getItem('token')
        const value = {
            productId,
            quantity
        }
        if (token) {
            const header = {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": token
                }
            }
            const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/cart/add`, value, header);
            if (data.status === "SUCCESS") {
                return data;
            }
        } else {
            throw new Error("Something Unexpected Happened")
        }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.status === "ERROR" ? error?.response?.data?.message : "Something Went Wrong";
        throw new Error(customErrorMessage);
    }

}

export const getCartItems = async () => {
    try {
        const token = localStorage.getItem('token')
        if (token) {
            const header = {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": token
                }
            }
            const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/cart/all`, header);
            if (data.status === "SUCCESS") {
                return data;
            }
        } else {
            throw new Error("Something Unexpected Happened")
        }

    } catch (error) {
        const customErrorMessage = error?.response?.data?.status === "ERROR" ? error?.response?.data?.message : "Something Went Wrong";
        throw new Error(customErrorMessage);
    }
}


export const addInvoice = async ({ cart, billingAddress, paymentMethod, bill }) => {
    try {
        const token = localStorage.getItem('token')
        const value = {
            items: [...cart],
            billingAddress,
            paymentMethod,
            bill
        }
        if (token) {
            const header = {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": token
                }
            }
            const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/invoice/add`, value, header);
            if (data.status === "SUCCESS") {
                return data;
            }
        } else {
            throw new Error("Something Unexpected Happened")
        }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.status === "ERROR" ? error?.response?.data?.message : "Something Went Wrong";
        throw new Error(customErrorMessage);
    }
}

export const fetchInvoice = async () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const header = {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": token
                }
            };
    
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/invoice/allInvoice`, header);
            
            if (response.data.status === "SUCCESS") {
                return response.data.invoices;
            } else {
                throw new Error(response.data.message || "Something went wrong");
            }
        } else {
            throw new Error("Authentication token not found");
        }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.status === "ERROR" ? error?.response?.data?.message : "Something Went Wrong";
        throw new Error(customErrorMessage);
    }
}


export const cleanCart = async (id) => {

    try {

        const token = localStorage.getItem("token");

        if (token) {
            const header = {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": token
                }
            }

            const { data } = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/cart/${id}`, header);
            if (data.status === "SUCCESS") {
                return data;
            }
        } else {
            throw new Error("Something Unexpected Happened")
        }

    } catch (error) {
        const customErrorMessage = error?.response?.data?.status === "ERROR" ? error?.response?.data?.message : "Something Went Wrong";
        throw new Error(customErrorMessage);
    }

}