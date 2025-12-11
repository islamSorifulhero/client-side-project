// src/pages/Dashboard/TrackOrder.jsx
import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrackOrder = () => {
    const { orderId } = useParams();
    const axiosSecure = useAxiosSecure();
    console.log(axiosSecure);

    const { data: order, isLoading } = useQuery({
        queryKey: ["track-order", orderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${orderId}`);
            return res.data;
        },
        enabled: !!orderId
    });

    if (isLoading) return <p className="py-8 text-center">Loading...</p>;
    if (!order) return <p className="py-8 text-center">Order not found.</p>;

    const steps = order.tracking || [];

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Tracking Order: {order.productTitle}</h2>

            {steps.length === 0 ? (
                <p className="text-center py-4">No tracking updates yet.</p>
            ) : (
                <div className="timeline">
                    {steps.map((step, index) => (
                        <div key={index} className="timeline-item mb-6 flex items-start">
                            <div className="timeline-marker w-4 h-4 rounded-full bg-blue-500 mt-1.5"></div>
                            <div className="timeline-content ml-4">
                                <h4 className="font-semibold">{step.status}</h4>
                                <p className="text-sm text-gray-600">{step.note}</p>
                                <p className="text-xs text-gray-400">{new Date(step.date).toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Location: {step.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrackOrder;
