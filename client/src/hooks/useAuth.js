import { useContext } from "react";
import { AuthContext } from "../provides/AuthProvider";

export const useAuth = () => useContext(AuthContext);