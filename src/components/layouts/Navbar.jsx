import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import LanguageSwitcher from "../LanguageSwitcher";
function Navbar({ activeMenu }) {
    const { t } = useTranslation();
    const [OpenSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 start-0">
                <div className="flex gap-5 items-center">
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
                        {t('expansesTracker')}
                    </h2>
                </div>
                <LanguageSwitcher />
            </div>
            {OpenSideMenu && <SideMenu activeMenu={activeMenu} />}
        </div>
    );
}

export default Navbar;
