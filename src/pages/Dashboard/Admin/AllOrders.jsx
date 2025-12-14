import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";

const AllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [filterStatus, setFilterStatus] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const { data: result = {}, isLoading } = useQuery({
        queryKey: ["all-orders", filterStatus, searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/admin?status=${filterStatus}&search=${searchQuery}`);
            return res.data;
        },
    });

    const orders = result.bookings || [];
    const totalOrders = result.total || 0;

    const handleView = (orderId) => {
        navigate(`/dashboard/order-details/${orderId}`);
    };

    if (isLoading) return <p className="py-8 text-center">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                All Orders ({totalOrders})
            </h2>

            <div className="flex flex-col md:flex-row gap-4 mb-6">

                {/* Search Input */}
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search by Product or User Email"
                        className="input input-bordered w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Status Filter */}
                <div className="w-full md:w-48">
                    <select
                        className="select select-bordered w-full"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">Filter by Status (All)</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
            </div>

            {/* --- Orders Table --- */}
            <div className="overflow-x-auto border rounded-lg shadow-sm">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Order ID</th>
                            <th className="py-3 px-6 text-left">User</th>
                            <th className="py-3 px-6 text-left">Product</th>
                            <th className="py-3 px-6 text-center">Quantity</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    No orders found matching your criteria.
                                </td>
                            </tr>
                        ) : (
                            orders.map((o) => (
                                <tr key={o._id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                                        {o._id.slice(-6)}
                                    </td>
                                    <td className="py-3 px-6 text-left">{o.userEmail}</td>
                                    <td className="py-3 px-6 text-left">{o.productTitle}</td>
                                    <td className="py-3 px-6 text-center">{o.orderQty}</td>
                                    <td className="py-3 px-6 text-center">
                                        <span className={`badge badge-lg ${o.status === 'pending' ? 'badge-warning' :
                                                o.status === 'approved' || o.status === 'paid' ? 'badge-success' :
                                                    o.status === 'rejected' ? 'badge-error' : 'badge-info'
                                            } text-white capitalize`}>
                                            {o.status || "pending"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            className="btn btn-sm btn-info text-white hover:bg-blue-600"
                                            onClick={() => handleView(o._id)}
                                        >
                                            <FaEye /> View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;