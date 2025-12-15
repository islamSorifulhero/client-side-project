import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 10;

const MyOrders = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ["my-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/bookings");
            return res.data;
        },
    });

    const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleView = (orderId) => {
        navigate(`/dashboard/order-details/${orderId}`);
    };

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/bookings/${id}`);
                toast.success("Order cancelled successfully.")
                refetch();
            }
        });
    };

    if (isLoading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">
                My Orders ({orders.length})
            </h2>

            <div className="overflow-x-auto border rounded-lg">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Payment</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentOrders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-6">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            currentOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id.slice(-6)}</td>
                                    <td>{order.productTitle}</td>
                                    <td className="text-center">{order.orderQty}</td>
                                    <td className="text-center capitalize">
                                        <span className={`badge ${order.status === "pending"
                                                ? "badge-warning"
                                                : order.status === "paid"
                                                    ? "badge-success"
                                                    : "badge-info"
                                            } text-white`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        {order.status === "paid" ? "Paid" : "Unpaid"}
                                    </td>
                                    <td className="text-center flex gap-2 justify-center">
                                        <button
                                            className="btn btn-sm btn-info text-white"
                                            onClick={() => handleView(order._id)}
                                        >
                                            <FaEye /> View
                                        </button>

                                        {order.status === "pending" && (
                                            <button
                                                className="btn btn-sm btn-error text-white"
                                                onClick={() => handleCancel(order._id)}
                                            >
                                                <FaTrash /> Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    {[...Array(totalPages).keys()].map((num) => (
                        <button
                            key={num}
                            onClick={() => setCurrentPage(num + 1)}
                            className={`btn btn-sm ${currentPage === num + 1 ? "btn-primary" : "btn-outline"
                                }`}
                        >
                            {num + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
