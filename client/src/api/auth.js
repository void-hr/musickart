import axios from "axios";

export const registerAccount = async( value ) => {
    try {
        const  { name, email, mobile, password }  = value
        const reqPayload = { name, email, mobile, password}
        const { data }  = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/account/register`, reqPayload);
       if(data.status === "SUCCESS") {
           return data;
       }else {
        throw new Error("Something Unexpected Happened")
       }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(customErrorMessage);
    }
}

export const loginAccount = async( value ) => {
    try {
        const  { email, password}  = value
        const reqPayload = { email, password}
        const { data }  = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/account/login`, reqPayload);
       if(data.status === "SUCCESS") {
           return data;
       }else {
        throw new Error("Something Unexpected Happened")
       }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(`${customErrorMessage}`);
    }
}


