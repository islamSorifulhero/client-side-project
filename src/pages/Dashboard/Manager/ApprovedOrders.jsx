// src/pages/Dashboard/Manager/ApprovedOrders.jsx
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ApprovedOrders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["approved-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/bookings?status=approved");
            return res.data;
        },
    });

    const addTracking = async (orderId) => {
        const location = prompt("Enter location:");
        const note = prompt("Enter note (optional):");
        if (!location) return;
        try {
            const res = await axiosSecure.patch(`/bookings/${orderId}/tracking`, {
                location,
                note,
                date: new Date(),
                status: "In Progress"
            });
            if (res.data.modifiedCount) {
                toast.success("Tracking info added!");
                queryClient.invalidateQueries(["approved-orders"]);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to add tracking!");
        }
    };

    if (isLoading) return <p className="py-8 text-center">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Approved Orders ({orders.length})</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Approved Date</th>
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
                                <td>{new Date(o.approvedAt).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => addTracking(o._id)} className="btn btn-sm btn-primary">Add Tracking</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovedOrders;
