import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

// Hook for get auth context
export const useAuth = () => useContext(AuthContext);