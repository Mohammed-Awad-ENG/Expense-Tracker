import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
function Navbar({ activeMenu }) {
    const [OpenSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div>
            <div className="flex gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 left-0">
                <button
                    className="block lg:hidden text-black"
                    onClick={() => setOpenSideMenu(!OpenSideMenu)}
                >
                    {OpenSideMenu ? (
                        <HiOutlineX className="text-2xl" />
                    ) : (
                        <HiOutlineMenu className="text-2xl" />
                    )}
                </button>
                <h2 className="text-lg font-bold text-black ">
                    Expanses Tracker
                </h2>
            </div>
            {OpenSideMenu && <SideMenu activeMenu={activeMenu} />}
        </div>
    );
}

export default Navbar;
