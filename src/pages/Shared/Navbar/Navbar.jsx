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

    const linksBeforeLogin = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-products">All-Products</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
        </>
    );

    const linksAfterLogin = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-products">All-Products</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {user ? linksAfterLogin : linksBeforeLogin}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl"><Logo /></Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {user ? linksAfterLogin : linksBeforeLogin}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <>
                        <span className="mr-2 font-semibold">{user.displayName}</span>
                        <button onClick={handleLogOut} className="btn btn-outline btn-error">Log Out</button>
                    </>
                ) : (
                    <Link className="btn btn-primary" to="/login">Log In</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
