import {
    LuLayoutDashboard,
    LuWalletMinimal,
    LuLogOut,
    LuHandCoins,
} from "react-icons/lu";

export const SideMenuData = [
    {
        id: "01",
        name: "Dashboard",
        icon: LuLayoutDashboard,
        link: "/dashboard",
    },
    {
        id: "02",
        name: "Income",
        icon: LuWalletMinimal,
        link: "/income",
    },
    {
        id: "03",
        name: "Expenses",
        icon: LuHandCoins,
        link: "/expense",
    },
    {
        id: "04",
        name: "Logout",
        icon: LuLogOut,
        link: "/logout",
    },
];
