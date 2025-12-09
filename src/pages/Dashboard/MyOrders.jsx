// src/pages/Dashboard/MyOrders.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const handleCancel = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        try {
            await axiosSecure.delete(`/bookings/${id}`);
            toast.success("Order cancelled!");
            refetch();
        } catch (err) {
            console.error(err);
            toast.error("Failed to cancel order.");
        }
    };

    if (isLoading) return <p className="py-8 text-center">Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">My Orders ({bookings.length})</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Tracking</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b, i) => (
                            <tr key={b._id}>
                                <th>{i + 1}</th>
                                <td>{b.productTitle}</td>
                                <td>{b.orderQty}</td>
                                <td>${b.orderPrice}</td>
                                <td>{b.trackingId || "—"}</td>
                                <td>{b.status || b.paymentStatus || "Pending"}</td>
                                <td>
                                    {b.status === "Pending" && (
                                        <button
                                            onClick={() => handleCancel(b._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
