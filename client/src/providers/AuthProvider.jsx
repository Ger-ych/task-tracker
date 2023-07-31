import { createContext, useState, useEffect } from "react";
import Loading from "../components/ui/Loading";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const updateUser = (newUserData) => {
        setUser(newUserData);
        localStorage.setItem("user", JSON.stringify(newUserData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ user, setUser: updateUser, logout }}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
