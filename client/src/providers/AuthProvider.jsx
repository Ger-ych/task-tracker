import { createContext, useState, useEffect } from "react";
import Loading from "../components/ui/Loading";

export const AuthContext = createContext();

// User authorization provider
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Getting user data from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Function for authorization for a new user
    const updateUser = (newUserData) => {
        setUser(newUserData);
        localStorage.setItem("user", JSON.stringify(newUserData));
    };

    // Permission functions
    const isAdmin = () => user.role === "admin";
    const isManager = () => user?.role === "manager";
    const isDeveloper = () => user?.role === "developer";

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ user, setUser: updateUser, logout, isAdmin, isManager, isDeveloper }}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;