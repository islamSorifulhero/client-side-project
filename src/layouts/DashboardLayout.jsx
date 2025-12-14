import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import logoImg from "../assets/logo.png";

// Icons
import { FaUsers, FaBoxOpen, FaTasks, FaUserCircle } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { SiGoogletasks } from "react-icons/si";

const DashboardLayout = () => {
    const { role } = useRole();

    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto min-h-screen">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* Drawer Content */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <nav className="navbar bg-base-300 px-4">
                    <label
                        htmlFor="dashboard-drawer"
                        className="btn btn-square btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="inline-block w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </label>

                    <div className="flex-1 px-2 text-lg font-semibold">
                        Garments Order & Production Tracker
                    </div>
                </nav>

                <main className="p-6 flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>

            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <aside className="bg-base-200 w-64 flex flex-col min-h-full">
                    <Link
                        to="/"
                        className="flex items-center justify-center p-4 border-b hover:bg-base-300"
                    >
                        <img src={logoImg} alt="Logo" className="w-28" />
                    </Link>

                    <ul className="menu p-4 w-full flex-1 space-y-1">

                        {/* BUYER */}
                        {role === "buyer" && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/my-orders" className="flex gap-2">
                                        <FaBoxOpen /> My Orders
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/track-order" className="flex gap-2">
                                        <CiDeliveryTruck /> Track Order
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/profile" className="flex gap-2">
                                        <FaUserCircle /> My Profile
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* MANAGER */}
                        {role === "manager" && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/add-product" className="flex gap-2">
                                        <FaBoxOpen /> Add Product
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/manage-products" className="flex gap-2">
                                        <FaTasks /> Manage Products
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/pending-orders" className="flex gap-2">
                                        <FaTasks /> Pending Orders
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/approved-orders" className="flex gap-2">
                                        <SiGoogletasks /> Approved Orders
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/profile" className="flex gap-2">
                                        <FaUserCircle /> My Profile
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* ADMIN */}
                        {role === "admin" && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/manage-users" className="flex gap-2">
                                        <FaUsers /> Manage Users
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/all-products" className="flex gap-2">
                                        <FaBoxOpen /> All Products
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/all-orders" className="flex gap-2">
                                        <FaTasks /> All Orders
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/profile" className="flex gap-2">
                                        <FaUserCircle /> Admin Profile
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;
