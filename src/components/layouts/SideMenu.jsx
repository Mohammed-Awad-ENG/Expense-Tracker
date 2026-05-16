import { SideMenuData } from "../../utils/Data";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextCreation";
import CharAvatar from "../cards/CharAvatar";
function SideMenu({ activeMenu }) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "/logout") {
            handleLogout();
            return;
        }
        navigate(route);
        return;
    };
    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate("/login");
    };
    
    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-15.25 z-99">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {/* todo: handle image */}
                {/* {user?.profileImageUrl ? (
                    <img
                        src={user.profileImageUrl}
                        alt="Profile Image"
                        className="w-16 h-16 rounded-full bg-slate-400"
                    />
                ) : (
                    <CharAvatar fullName={user?.fullName} />
                )} */}

                {<CharAvatar fullName={user?.fullName} />}
                <h5 className="text-gray-950 font-bold capitalize leading-6">
                    {user?.fullName || "User"}
                </h5>
            </div>
            {SideMenuData.map((item) => (
                <button
                    key={item.id}
                    className={`w-full flex items-center gap-4 text-[15px] cursor-pointer py-3 px-6 rounded-lg mb-3 transition-colors ${
                        activeMenu === item.name
                            ? "text-white bg-primary"
                            : "text-gray-600 hover:bg-gray-50" // Added fallback colors for inactive items
                    }`}
                    onClick={() => handleClick(item.link)}
                >
                    <item.icon className="text-xl" />
                    <span>{item.name}</span>
                </button>
            ))}
        </div>
    );
}

export default SideMenu;
