import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";

// HOC to allow access to the page only to unauthorized users
export const withoutAuth = (Component) => (props) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    if (user) {
        return null;
    }

    return <Component {...props} />
}
