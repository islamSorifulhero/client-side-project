// src/pages/Dashboard/Admin/AllOrders.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllOrders = () => {
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["all-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/bookings");
            return res.data;
        },
    });

    if (isLoading) return <p className="py-8 text-center">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">All Orders ({orders.length})</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Payment</th>
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
                                <td>{o.status || "Pending"}</td>
                                <td>{o.paymentRequired ? "Paid/Online" : "COD"}</td>
                                <td>
                                    <button className="btn btn-sm btn-info">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;
