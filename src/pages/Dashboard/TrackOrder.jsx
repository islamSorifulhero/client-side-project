// src/pages/Dashboard/TrackOrder.jsx
import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrackOrder = () => {
    const { orderId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: order, isLoading } = useQuery({
        queryKey: ["booking", orderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${orderId}`);
            return res.data;
        },
        enabled: !!orderId
    });

    if (isLoading) return <p className="py-8 text-center">Loading...</p>;
    if (!order) return <p className="py-8 text-center">Order not found.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Track Order: {order.productTitle}</h2>
            <div className="timeline">
                {order.trackingHistory?.length ? (
                    order.trackingHistory.map((step, i) => (
                        <div key={i} className="mb-4">
                            <div className="font-semibold">{step.status}</div>
                            <div className="text-sm">{step.location} | {new Date(step.date).toLocaleString()}</div>
                            {step.notes && <div className="text-gray-500">{step.notes}</div>}
                        </div>
                    ))
                ) : (
                    <p>No tracking updates yet.</p>
                )}
            </div>
        </div>
    );
};

export default TrackOrder;
