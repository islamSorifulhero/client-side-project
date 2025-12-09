import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllOrders = () => {
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], refetch } = useQuery({
        queryKey: ["all-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/bookings");
            return res.data;
        },
    });

    const updateStatus = async (id, status) => {
        await axiosSecure.patch(`/bookings/status/${id}`, { status });
        refetch();
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">All Orders</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((o, i) => (
                            <tr key={o._id}>
                                <td>{i + 1}</td>
                                <td>{o.email}</td>
                                <td>{o.productTitle}</td>
                                <td>{o.orderQty}</td>
                                <td>${o.orderPrice}</td>
                                <td>{o.status}</td>
                                <td>
                                    <button
                                        className="btn btn-xs"
                                        onClick={() => updateStatus(o._id, "processing")}
                                    >
                                        Processing
                                    </button>

                                    <button
                                        className="btn btn-xs btn-success ml-2"
                                        onClick={() => updateStatus(o._id, "completed")}
                                    >
                                        Completed
                                    </button>
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
