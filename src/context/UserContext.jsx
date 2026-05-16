import { UserContext } from "./UserContextCreation";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
            .then((res) => setUser(res.data))
            .catch((err) => console.error("User fetch failed:", err.response?.status));
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}