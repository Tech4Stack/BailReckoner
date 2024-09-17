import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const time = { day, month, year };

    const roles = [
        { label: "Judge" },
        { label: "Advocate" },
        { label: "Police" },
        { label: "Applicant" }
    ];

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const [event, setEvent] = useState(null);
    const [theme, setTheme] = useState("dark");
    const [role, setRole] = useState();

    const storeTokenInLS = (serverToken) => {
        localStorage.setItem('token', serverToken); // Fixed token key
    };

    const removeTokenInLS = () => {
        localStorage.removeItem('token'); // Fixed token key
        setToken(null);
        toast.success("Logged out successfully!!!");
    };

    const LogoutUser = () => {
        removeTokenInLS();
    };

    const userAuthentication = async () => {
        if (token) {
            console.log(token);
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/user`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.msg) {
                        localStorage.setItem('user', JSON.stringify(data.msg));
                        setUser(data.msg);
                    } else {
                        console.error("Unexpected API response format:", data);
                    }
                } else {
                    console.error("Server returned an error:", response.status, response.statusText);
                }
            } catch (error) {
                console.error("Error during user authentication:", error);
            }
        }
    };

    useEffect(() => {
        userAuthentication(); // Initial call

        const intervalId = setInterval(() => {
            userAuthentication(); // Periodic call every 10 seconds
        }, 60000); // 10000 milliseconds = 10 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [token]); // Dependency array includes token to re-run if token changes

    const cUser = "lawyer"; // lawyer || judge || applicant

    return (
        <AuthContext.Provider value={{ cUser, setIsLoggedIn, isLoggedIn, storeTokenInLS, LogoutUser, removeTokenInLS, user, token, setEvent, event, time, theme, setTheme, roles, role, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};