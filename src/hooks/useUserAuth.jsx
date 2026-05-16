import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextCreation";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosinstance";

function useUserAuth() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) return;

        let isMounted = true;
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(
                    API_PATHS.AUTH.GET_USER_INFO,
                );
                if (isMounted && response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                if (isMounted) {
                    setUser(null);
                    navigate("/login");
                }
            }
        };

        fetchUserData();

        return () => {
            isMounted = false;
        };
    }, [user, setUser, navigate]);

    return <div>useUserAuth</div>;
}

export default useUserAuth;
