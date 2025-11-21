import React, {useEffect, useState} from "react";
import {assets} from "../../assets/data";
import Navbar from "../Navbar/Navbar.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useUser, useClerk, UserButton} from "@clerk/clerk-react";

const BookingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-text-icon lucide-scroll-text"><path d="M15 12h-5"></path><path d="M15 8h-5"></path><path d="M19 17V5a2 2 0 0 0-2-2H4"></path><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"></path></svg>
);

export default function Header() {
    const [menuOpened, setMenuOpened] = useState(false);
    const [active, setActive] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const location = useLocation();
    const {user} = useUser();
    const {openSignIn} = useClerk();
    const navigate = useNavigate();

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
                                <UserButton
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: {
                                                width: "42px",
                                                height: "42px",
                                            },
                                        },
                                    }}
                                >
                                    <UserButton.MenuItems>
                                        <UserButton.Action
                                            label="My Bookings"
                                            labelIcon={<BookingIcon/> }
                                            onClick={() => navigate("/my-bookings")}
                                        />
                                    </UserButton.MenuItems>
                                </UserButton>
                            ) : (
                                <button
                                    onClick={openSignIn}
                                    className="btn-solid bg-black flexCenter gap-2 rounded-full"
                                >
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
