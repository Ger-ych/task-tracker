import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";

export const withAuth = (Component) => (props) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return <Component {...props} />
}
