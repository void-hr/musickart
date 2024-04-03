import { createContext, useContext, useEffect, useState } from "react";
import { getCartItems } from "../api/orders";
import { AuthContext } from "./Auth"; 
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [totalItems, setTotalItems] = useState(0);
    const {isLogged} = useContext(AuthContext);
    useEffect(() => {
        const fetchAllCart = async () => {
            try {
                const { cart } = await getCartItems();
                const sumOfQuantities = cart?.items.reduce((total, product) => total + product.quantity, 0);
                setTotalItems(sumOfQuantities);
            } catch (error) {
                setTotalItems(0);
            }
        }
        fetchAllCart();
    }, [totalItems, isLogged])

    return (
        <CartContext.Provider value={{ totalItems, setTotalItems }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);