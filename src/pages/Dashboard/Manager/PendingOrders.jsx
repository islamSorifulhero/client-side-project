import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const PendingOrders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["pending-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/bookings/admin?status=pending");
            return res.data.bookings;
        },
    });

    const handleApprove = async (orderId) => {
        try {
            const res = await axiosSecure.patch(`/bookings/${orderId}/approve`);
            if (res.data.modifiedCount) {
                toast.success("Order approved!");
                queryClient.invalidateQueries(["pending-orders"]);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to approve order!");
        }
    };

    const handleReject = async (orderId) => {
        const reason = prompt("Enter rejection reason:");
        if (!reason) return;
        try {
            const res = await axiosSecure.patch(`/bookings/${orderId}/reject`, { reason });
            if (res.data.modifiedCount) {
                toast.success("Order rejected!");
                queryClient.invalidateQueries(["pending-orders"]);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to reject order!");
        }
    };

    if (isLoading) return <p className="py-8 text-center">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Pending Orders ({orders.length})</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Order Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o, i) => (
                            <tr key={o._id}>
                                <th>{i + 1}</th>
                                <td>{o.userEmail}</td>
                                <td>{o.productTitle}</td>
                                <td>{o.orderQty}</td>
                                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                <td className="flex gap-2">
                                    <button onClick={() => handleApprove(o._id)} className="btn btn-sm btn-success">Approve</button>
                                    <button onClick={() => handleReject(o._id)} className="btn btn-sm btn-error">Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingOrders;
