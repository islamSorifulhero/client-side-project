import React from 'react';
import Logo from '../../../components/Logo/Logo';
import useAuth from '../../../hooks/useAuth';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    const mainMenu = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-products">All-Products</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">

            {/* ---- LEFT SIDE ---- */}
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    <ul tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 
                        rounded-box z-10 mt-3 w-52 p-2 shadow">

                        {mainMenu}

                        {/* Mobile a Auth buttons */}
                        {!user && (
                            <>
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/register">Register</NavLink></li>
                            </>
                        )}

                        {user && (
                            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        )}
                    </ul>
                </div>

                <Link to="/">
                    <Logo />
                </Link>
            </div>

            {/* ---- CENTER MENU (LARGE SCREEN) ---- */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {mainMenu}
                </ul>
            </div>

            {/* ---- RIGHT SIDE (AUTH AREA) ---- */}
            <div className="navbar-end">

                {!user && (
                    <>
                        <Link className="btn mx-1" to="/login">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/register">Register</Link>
                    </>
                )}

                {user && (
                    <>
                        <span className="mr-3 font-semibold">
                            {user.displayName}
                        </span>
                        <Link className="btn mx-1" to="/dashboard">Dashboard</Link>
                        <button
                            onClick={handleLogOut}
                            className="btn btn-outline btn-error mx-1">
                            Log Out
                        </button>
                    </>
                )}

            </div>
        </div>
    );
};

export default Navbar;
