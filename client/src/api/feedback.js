import axios from "axios";

export const createFeedback = async({feedbackType, feedbackText}) => {
    try {
            const value = {
                feedbackText,
                feedbackType
            }
      
            const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/feedback`, value);
            if (data.status === "SUCCESS") {
                return data;
            }
        
    } catch (error) {
        const customErrorMessage = error?.response?.data?.status === "ERROR" ? error?.response?.data?.message : "Something Went Wrong";
        throw new Error(customErrorMessage);
    }
    
}