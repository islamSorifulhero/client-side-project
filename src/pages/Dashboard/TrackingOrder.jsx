import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaCheckCircle, FaClock, FaIndustry, FaBoxOpen, FaTruck } from 'react-icons/fa';

const getStepStyles = (status) => {
    const list = {
        'cutting_completed': { icon: <FaIndustry />, color: "bg-orange-500", label: "Cutting Completed" },
        'sewing_started': { icon: <FaIndustry />, color: "bg-blue-500", label: "Sewing Started" },
        'qc_checked': { icon: <FaCheckCircle />, color: "bg-green-500", label: "QC Checked" },
        'packed': { icon: <FaBoxOpen />, color: "bg-purple-500", label: "Packed" },
        'shipped': { icon: <FaTruck />, color: "bg-indigo-500", label: "Shipped" },
        'delivered': { icon: <FaCheckCircle />, color: "bg-green-700", label: "Delivered" },
    };
    return list[status] || { icon: <FaClock />, color: "bg-gray-500", label: status.replace('_', ' ') };
};

const TrackingOrder = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: booking = {}, isLoading } = useQuery({
        queryKey: ["tracking", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-booking/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40 w-full my-10">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    const history = booking.tracking || [];

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg my-10">
            <h2 className="text-2xl font-bold mb-2">Order Tracker</h2>
            <p className="text-sm text-gray-500 mb-8 font-mono">Order ID: {booking._id}</p>

            <div className="relative border-l-4 border-gray-200 ml-4 space-y-8">
                {history.map((step, index) => {
                    const isLatest = index === history.length - 1;
                    const style = getStepStyles(step.status);

                    return (
                        <div key={index} className="relative ml-8">
                            <div className={`absolute -left-[42px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md ${style.color} ${isLatest ? 'ring-4 ring-offset-2 ring-indigo-300' : ''}`}>
                                {style.icon}
                            </div>

                            <div className={`p-4 rounded-lg border ${isLatest ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-100'}`}>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold capitalize">{style.label}</h4>
                                    <span className="text-xs text-gray-400">
                                        {new Date(step.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                {step.location && <p className="text-sm text-indigo-600 font-medium">📍 {step.location}</p>}
                                {step.note && <p className="text-sm text-gray-600 mt-1 italic">"{step.note}"</p>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {!history.length && <p className="text-center text-gray-400">No tracking data available yet.</p>}
        </div>
    );
};

export default TrackingOrder;