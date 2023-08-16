import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";

// HOC to allow access to the page only to administrators and managers
export const onlyAdminOrManager = (Component) => (props) => {
    const { user, isAdmin, isManager } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        else if (!isAdmin() && !isManager()) {
            navigate("/");
        }
    }, [user, navigate]);

    if (!user || (!isAdmin() && !isManager())) {
        return null;
    }

    return <Component {...props} />
}
