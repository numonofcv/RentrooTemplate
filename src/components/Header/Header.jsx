import React, {useEffect, useState} from "react";
import {assets} from "../../assets/data";
import Navbar from "../Navbar/Navbar.jsx";
import {Link, useLocation} from "react-router-dom";
import {useUser, useClerk, UserButton} from "@clerk/clerk-react";
export default function Header() {
    const [menuOpened, setMenuOpened] = useState(false);
    const [active, setActive] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const location = useLocation();
    const {user} = useUser();
const {openSignIn} = useClerk();
    const isHomepage = location.pathname.endsWith("/");
    useEffect(() => {
        const handleScroll = () => {
            setActive(window.scrollY > 10);
            if (window.scrollY > 10) {
                setActive(false);
            } else {
                setActive(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [location.pathname]);

    const toggleMenu = () => setMenuOpened((prev) => !prev);
    return (
        <header
            className={`${active ? "bg-white shadow-sm py-2" : "py-3"} ${
                isHomepage && "bg-white"
            } fixed w-full top-0 left-0 z-50 transition-all transition-all duration-200`}
        >
            <div className="max-padd-container">
                {/* Container */}
                <div className="flexBetween">
                    {/* Logo */}
                    <div className="flex flex-1">
                        <Link to="/">
                            <img src={assets.logoImg} alt="Logo" width={88} className="h-7" />
                            <span className="text-textColor uppercase text-xs font-extrabold tracking-[6px] relative bottom-1">
                                Rentroo
                            </span>
                        </Link>
                    </div>
                    {/* Navbar */}
                    <Navbar
                        containerStyled={
                            menuOpened
                                ? "flex items-start flex-col gap-y-8 fixed top-16 right-16 p-5 bg-white shadow-md w-52 ring-1 ring-slate-900/5 rounded-xl z-50 shadow-lg"
                                : "hidden lg:flex gap-x-5 xl:gap-x-1 text-sm font-semibold p-1"
                        }
                    />
                    {/* buttons & searchbar & profile */}
                    <div className="flex sm:flex-1 items-center sm:justify-end gap-x-4 sm:gap-x-8">
                        {/* search bar */}
                        <div className="relative hidden xl:flex items-center">
                            {/* input */}
                            <div
                                className={`transition-all duration-300 ease-in-out right-1 ring-slate-900/10 border border-gray-300 bg-white rounded-full overflow-hidden ${
                                    showSearch ? "w-[266px] opacity-100 px-4 py-2" : "w-11 opacity-0 px-0 py-0"
                                }`}
                            >
                                <input
                                    type="text"
                                    placeholder="Type here..."
                                    className="w-full text-sm outline-none pr-10 placeholder-gray-400"
                                />
                            </div>
                            {/* toggle button  */}
                            <div
                                onClick={() => setShowSearch((prev) => !prev)}
                                className="absolute right-0 cursor-pointer ring-1 ring-slate-900/10 bg-white rounded-full p-[8px] cursor-pointer z-10"
                            >
                                <img src={assets.search} alt="Search" />
                            </div>
                        </div>
                        {/*  toggle menu */}
                        <>
                            {menuOpened ? (
                                <img
                                    onClick={toggleMenu}
                                    src={assets.close}
                                    className={`lg:hidden cursor-pointer text-xl`}
                                    alt="Close Menu"
                                />
                            ) : (
                                <img
                                    onClick={toggleMenu}
                                    src={assets.menu}
                                    className={`lg:hidden cursor-pointer text-xl`}
                                    alt="Open Menu"
                                />
                            )}
                        </>
                        <div className="group">
                            {user ? (
                                <UserButton/>
                            ) : (
                                <button onClick={openSignIn} className="btn-solid bg-black flexCenter gap-2 rounded-full">
                                    Login <img src={assets.user} alt="User Icon" className="invert" />{" "}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
