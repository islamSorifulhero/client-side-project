import React from 'react';
import { Link, NavLink } from 'react-router';
import { FaMoon, FaSun, FaSignOutAlt, FaThLarge, FaUserCircle, FaShoppingBag, FaHeart } from 'react-icons/fa';
import Logo from '../../../components/Logo/Logo';
import useAuth from '../../../hooks/useAuth';
import useTheme from '../../../hooks/useTheme';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [Theme, toggleTheme] = useTheme();

    const handleLogOut = () => {
        logOut().catch(error => console.error("Logout Error:", error));
    };

    // Active Link styling with Bold text
    const navLinkStyles = ({ isActive }) =>
        `text-sm lg:text-base font-black transition-all duration-200 uppercase tracking-wide ${
            isActive 
            ? "text-primary border-b-2 border-primary pb-1" 
            : "text-gray-700 dark:text-gray-200 hover:text-primary"
        }`;

    // Common Links
    const baseMenu = (
        <>
            <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
            <li><NavLink to="/all-products" className={navLinkStyles}>All-Products</NavLink></li>
        </>
    );

    // Guest Links (Logged Out)
    const guestMenuLinks = (
        <>
            <li><NavLink to="/about" className={navLinkStyles}>About Us</NavLink></li>
            <li><NavLink to="/contact" className={navLinkStyles}>Contact</NavLink></li>
        </>
    );

    // Authenticated Links (Logged In)
    const loggedInLinks = (
        <>
            <li><NavLink to="/my-orders" className={navLinkStyles}>My Orders</NavLink></li>
            <li><NavLink to="/wishlist" className={navLinkStyles}>Wishlist</NavLink></li>
        </>
    );

    return (
        <div className="navbar sticky top-0 z-50 shadow-md backdrop-blur-md bg-white/90 dark:bg-gray-900/95 border-b border-base-200 dark:border-gray-700 px-4 md:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box z-[1] mt-3 w-56 p-4 shadow-2xl border border-base-200 gap-3">
                        {baseMenu}
                        {!user ? guestMenuLinks : loggedInLinks}
                        {user && <li><NavLink to="/dashboard" className={navLinkStyles}>Dashboard</NavLink></li>}
                    </ul>
                </div>
                <Link to="/" className="flex items-center transform hover:scale-105 transition-transform">
                    <Logo />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-8">
                    {baseMenu}
                    {!user ? guestMenuLinks : loggedInLinks}
                </ul>
            </div>

            <div className="navbar-end gap-3">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="btn btn-ghost btn-circle hover:bg-base-200 dark:hover:bg-gray-700"
                    aria-label="Toggle Theme"
                >
                    {Theme === 'dark' 
                        ? <FaSun className="w-5 h-5 text-yellow-400" /> 
                        : <FaMoon className="w-5 h-5 text-indigo-700" />
                    }
                </button>

                {!user ? (
                    <div className="flex items-center gap-2">
                        <Link className="btn btn-ghost btn-sm font-black text-gray-700 dark:text-gray-200" to="/login">LOGIN</Link>
                        <Link className="btn btn-primary btn-sm px-6 rounded-md font-black shadow-lg" to="/register">REGISTER</Link>
                    </div>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online border-2 border-primary/30">
                            <div className="w-10 rounded-full">
                                <img 
                                    src={user.photoURL || "https://i.ibb.co/mJR9nkv/default-avatar.png"} 
                                    alt="User" 
                                />
                            </div>
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-xl z-[1] mt-3 w-64 p-3 shadow-2xl border-2 border-primary/10">
                            <div className="px-4 py-3 mb-2 border-b border-base-200 dark:border-gray-700 bg-primary/5 rounded-t-lg">
                                <p className="text-sm font-black truncate text-primary uppercase">
                                    {user.displayName || "Active User"}
                                </p>
                                <p className="text-xs font-bold text-gray-500 truncate">{user.email}</p>
                            </div>
                            
                            <li className="font-bold">
                                <Link to="/dashboard" className="flex items-center gap-2 py-3 hover:text-primary">
                                    <FaThLarge className="text-primary" /> DASHBOARD
                                </Link>
                            </li>
                            <li className="font-bold">
                                <Link to="/dashboard/profile" className="flex items-center gap-2 py-3 hover:text-primary">
                                    <FaUserCircle className="text-primary" /> MY PROFILE
                                </Link>
                            </li>
                            <div className="divider my-0"></div>
                            <li className="font-bold">
                                <button onClick={handleLogOut} className="flex items-center gap-2 py-3 text-error hover:bg-error/10">
                                    <FaSignOutAlt /> LOG OUT
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