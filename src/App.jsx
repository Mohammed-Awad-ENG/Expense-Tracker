import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signUp",
        element: <SignUp />,
    },
    {
        path: "/dashboard",
        element: <Home />,
    },
    {
        path: "/income",
        element: <Income />,
    },
    {
        path: "/expense",
        element: <Expense />,
    },
]);

function App() {
    return (
        <UserProvider>
            <RouterProvider router={router} />
            <Toaster
                toastOptions={{
                    className: "",
                    style: {
                        fontSize: "13px",
                    },
                }}
            />
        </UserProvider>
    );
}

export default App;

function Root() {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? (
        <Navigate to="/dashboard" />
    ) : (
        <Navigate to="/login" />
    );
}
