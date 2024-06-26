import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"; 

export const AuthContext = createContext();

const AuthProvider = ({ children}) => {
    const [ isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLogged(!!token);
    },[]);

    const login = ( token, user ) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        setIsLogged(true);
    } 

    const logout = () => {
        localStorage.removeItem("token");
        setIsLogged(false);
    }
  return (
    
    <AuthContext.Provider value={{ isLogged, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider