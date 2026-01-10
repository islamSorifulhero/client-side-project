import React from "react";
import { Link, NavLink } from "react-router";
import {
    FaMoon,
    FaSun,
    FaSignOutAlt,
    FaThLarge,
    FaUserCircle,
} from "react-icons/fa";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import useTheme from "../../../hooks/useTheme";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [theme, toggleTheme] = useTheme();

    const handleLogOut = () => {
        logOut().catch((error) => console.error(error));
    };

    const navLinkStyles = ({ isActive }) =>
        `text-sm lg:text-base font-black uppercase tracking-wide transition-all ${isActive
            ? "text-primary border-b-2 border-primary pb-1"
            : "text-base-content hover:text-primary"
        }`;

    const baseMenu = (
        <>
            <li>
                <NavLink to="/" className={navLinkStyles}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/all-products" className={navLinkStyles}>
                    All Products
                </NavLink>
            </li>
        </>
    );

    const guestLinks = (
        <>
            <li>
                <NavLink to="/about" className={navLinkStyles}>
                    About
                </NavLink>
            </li>
            <li>
                <NavLink to="/contact" className={navLinkStyles}>
                    Contact
                </NavLink>
            </li>
        </>
    );

    const userLinks = (
        <>
            <li>
                <NavLink to="/my-orders" className={navLinkStyles}>
                    My Orders
                </NavLink>
            </li>
            <li>
                <NavLink to="/wishlist" className={navLinkStyles}>
                    Wishlist
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar sticky top-0 z-50 bg-base-100/90 backdrop-blur-md shadow border-b border-base-200 px-4 md:px-8">

            {/* LEFT */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        ☰
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 w-56 rounded-box bg-base-100 p-4 shadow-xl gap-2"
                    >
                        {baseMenu}
                        {!user ? guestLinks : userLinks}
                        {user && (
                            <li>
                                <NavLink to="/dashboard" className={navLinkStyles}>
                                    Dashboard
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>

                <Link to="/" className="ml-2 hover:scale-105 transition">
                    <Logo />
                </Link>
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-8">
                    {baseMenu}
                    {!user ? guestLinks : userLinks}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end gap-3">
                {/* THEME TOGGLE */}
                <button
                    onClick={toggleTheme}
                    className="btn btn-ghost btn-circle"
                    aria-label="Toggle Theme"
                >
                    {theme === "dark" ? (
                        <FaSun className="text-yellow-400 w-5 h-5" />
                    ) : (
                        <FaMoon className="text-primary w-5 h-5" />
                    )}
                </button>

                {!user ? (
                    <>
                        <Link to="/login" className="btn btn-ghost btn-sm font-black">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-primary btn-sm font-black">
                            Register
                        </Link>
                    </>
                ) : (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full border border-primary">
                                <img
                                    src={user.photoURL || "https://i.ibb.co/mJR9nkv/default-avatar.png"}
                                    alt="User"
                                />
                            </div>
                        </label>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 w-60 rounded-box bg-base-100 p-3 shadow-xl"
                        >
                            <div className="px-3 py-2 border-b border-base-200">
                                <p className="font-black text-primary text-sm uppercase truncate">
                                    {user.displayName || "Active User"}
                                </p>
                                <p className="text-xs text-base-content/60 truncate">
                                    {user.email}
                                </p>
                            </div>

                            <li>
                                <Link to="/dashboard" className="font-bold">
                                    <FaThLarge /> Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/profile" className="font-bold">
                                    <FaUserCircle /> Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogOut}
                                    className="text-error font-bold"
                                >
                                    <FaSignOutAlt /> Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
