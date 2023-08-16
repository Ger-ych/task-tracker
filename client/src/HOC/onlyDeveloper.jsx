import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";

// HOC to allow access to the page only to developers
export const onlyDeveloper = (Component) => (props) => {
    const { user, isDeveloper } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        else if (!isDeveloper()) {
            navigate("/");
        }
    }, [user, navigate]);

    if (!user || !isDeveloper()) {
        return null;
    }

    return <Component {...props} />
}
