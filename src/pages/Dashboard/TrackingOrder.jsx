import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTruck, FaBox, FaCheckCircle, FaTimesCircle, FaClock, FaClipboardList, FaMoneyBillWave } from 'react-icons/fa';
import { useParams } from 'react-router';

const getStatusIcon = (status) => {
    switch (status) {
        case 'booking_created':
            return { icon: <FaClipboardList className="w-6 h-6 text-gray-500" />, color: "text-gray-500", title: "Order Placed" };
        case 'payment_received':
            return { icon: <FaMoneyBillWave className="w-6 h-6 text-green-600" />, color: "text-green-600", title: "Payment Successful" };
        case 'order_approved':
            return { icon: <FaCheckCircle className="w-6 h-6 text-blue-600" />, color: "text-blue-600", title: "Order Approved" };
        case 'shipped':
            return { icon: <FaTruck className="w-6 h-6 text-yellow-600" />, color: "text-yellow-600", title: "Shipped" };
        case 'delivered':
            return { icon: <FaBox className="w-6 h-6 text-green-600" />, color: "text-green-600", title: "Delivered" };
        case 'order_rejected':
        case 'order_cancelled_by_user':
            return { icon: <FaTimesCircle className="w-6 h-6 text-red-600" />, color: "text-red-600", title: "Cancelled/Rejected" };
        default:
            return { icon: <FaClock className="w-6 h-6 text-indigo-500" />, color: "text-indigo-500", title: "In Progress" };
    }
};

const formatStatus = (status) => {
    if (!status) return "Pending";
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};


const TrackingOrder = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: booking = {}, isLoading, isError } = useQuery({
        queryKey: ["booking-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-booking/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) return <p className="py-8 text-center">Loading order details...</p>;
    if (isError) return <p className="py-8 text-center text-red-600">Failed to load order details. Please check the Order ID.</p>;
    if (!booking._id) return <p className="py-8 text-center text-red-600">Order not found.</p>;

    const trackingHistory = booking.tracking || [];

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
                Track Order: <span className="text-indigo-600">{booking._id}</span>
            </h2>

            <div className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-700">Order Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <p>
                        <span className="font-medium">Product:</span> {booking.productTitle}
                    </p>
                    <p>
                        <span className="font-medium">Quantity:</span> {booking.orderQty} pcs
                    </p>
                    <p>
                        <span className="font-medium">Total Price:</span> ${booking.orderPrice}
                    </p>
                    <p>
                        <span className="font-medium">Status:</span>
                        <span className={`font-bold ml-1 ${booking.status === 'delivered' ? 'text-green-600' : booking.status === 'rejected' || booking.status === 'cancelled' ? 'text-red-600' : 'text-orange-500'}`}>
                            {formatStatus(booking.status)}
                        </span>
                    </p>
                    <p>
                        <span className="font-medium">Tracking ID:</span> {booking.trackingId || 'N/A'}
                    </p>
                    <p>
                        <span className="font-medium">Payment:</span> {booking.paymentMethod || 'COD/Unpaid'}
                    </p>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-4 text-gray-700">Tracking Timeline</h3>
            <div className="relative border-l-4 border-indigo-200 ml-4">

                {trackingHistory.length > 0 ? (
                    trackingHistory.map((track, index) => {
                        const { icon, color, title } = getStatusIcon(track.status);
                        const isLatest = index === trackingHistory.length - 1;

                        return (
                            <div key={index} className="mb-8 ml-6">
                                <div className={`absolute -left-3.5 top-0 w-7 h-7 flex items-center justify-center rounded-full ${isLatest ? 'bg-indigo-600 shadow-xl' : 'bg-white border-4 border-indigo-400'}`}>
                                    {icon}
                                </div>

                                <div className={`p-4 rounded-lg shadow-md transition duration-300 ease-in-out ${isLatest ? 'bg-indigo-50 border-l-4 border-indigo-600' : 'bg-white border'}`}>
                                    <p className={`font-bold text-lg ${color}`}>{title}</p>
                                    {(track.location || track.note) && (
                                        <p className="text-gray-600 mt-2 text-sm">
                                            {track.location && `Location: ${track.location}`}
                                            {track.location && track.note && ' | '}
                                            {track.note && `Note: ${track.note}`}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="ml-6 text-gray-500">No tracking updates available yet.</p>
                )}
            </div>

        </div>
    );
};

export default TrackingOrder;