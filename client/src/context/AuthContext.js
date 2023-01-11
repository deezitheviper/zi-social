import {useState, createContext, useEffect} from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
      );

    const login = () => {
        setCurrentUser({id:1, name: 'John', email: 'oculus@gmail.com'});
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])

    return(
        <AuthContext.Provider value={{
            currentUser,
            login,
            setCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
} 