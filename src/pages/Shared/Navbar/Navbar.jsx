import React from 'react';
import Logo from '../../../components/Logo/Logo';
import useAuth from '../../../hooks/useAuth';
import { Link, NavLink } from 'react-router';
import useTheme from '../../../hooks/useTheme';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [Theme, toggleTheme] = useTheme();

    const handleLogOut = () => {
        logOut()
            .catch(error => console.log(error));
    };

    const baseMenu = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-products">All-Products</NavLink></li>
        </>
    );

    const guestMenuLinks = (
        <>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 
                        rounded-box z-[1] mt-3 w-52 p-2 shadow">

                        {baseMenu}

                        {!user ? (
                            <>
                                {guestMenuLinks}
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/register">Register</NavLink></li>
                            </>
                        ) : (
                            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        )}
                    </ul>
                </div>

                <Link to="/">
                    <Logo />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {baseMenu}
                    {!user && guestMenuLinks}
                </ul>
            </div>

            <div className="navbar-end">

                <button
                    onClick={toggleTheme}
                    className="btn btn-ghost btn-circle"
                    aria-label="Toggle Theme"
                >
                    {Theme === 'dark'
                        ? <FaSun className="w-6 h-6 text-yellow-400" />
                        : <FaMoon className="w-6 h-6 text-gray-700" />
                    }
                </button>

                {!user && (
                    <div className="flex items-center">
                        <Link className="btn btn-sm btn-ghost mx-1 hidden md:inline-flex" to="/login">Login</Link>
                        <Link className="btn btn-sm btn-primary mx-1 hidden md:inline-flex" to="/register">Register</Link>
                    </div>
                )}

                {user && (
                    <div className="hidden lg:flex items-center gap-2">
                        <Link className="btn btn-sm btn-neutral" to="/dashboard">Dashboard</Link>
                        <button onClick={handleLogOut} className="btn btn-sm btn-outline btn-error">Log Out</button>
                    </div>
                )}

                {user && (
                    <div className="dropdown dropdown-end ml-2">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 h-10 rounded-full border">
                                <img
                                    src={user.photoURL || "/default-avatar.png"}
                                    className="w-full h-full object-cover rounded-full"
                                    alt="User Avatar"
                                    title={user.displayName || user.email}
                                />
                            </div>
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><button onClick={handleLogOut}>Log Out</button></li>
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Navbar;