import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTruck, FaCheckCircle, FaTimesCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

const statusColorMap = {
    pending: 'bg-yellow-500',
    approved: 'bg-blue-500',
    paid: 'bg-green-500',
    rejected: 'bg-red-500',
    shipped: 'bg-purple-500',
    delivered: 'bg-emerald-600',
};

const OrderDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [statusUpdate, setStatusUpdate] = useState('');
    const [note, setNote] = useState('');
    const [location, setLocation] = useState('');

    const { data: order = {}, isLoading, isError } = useQuery({
        queryKey: ["order-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-booking/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const currentTracking = order.tracking || [];
    const currentStatus = order.status || 'pending';

    const updateTrackingMutation = useMutation({
        mutationFn: (payload) =>
            axiosSecure.patch(`/bookings/${id}/tracking`, payload),
        onSuccess: () => {
            toast.success(`Tracking updated to ${statusUpdate.toUpperCase()}`);
            queryClient.invalidateQueries(["order-details", id]);
            setStatusUpdate('');
            setNote('');
            setLocation('');
        },
        onError: () => toast.error("Failed to update tracking"),
    });

    const approveRejectMutation = useMutation({
        mutationFn: ({ action, reason }) => {
            if (action === 'approve') {
                return axiosSecure.patch(`/bookings/${id}/approve`);
            }
            return axiosSecure.patch(`/bookings/${id}/reject`, { reason });
        },
        onSuccess: (_, vars) => {
            toast.success(`Order ${vars.action}ed successfully`);
            queryClient.invalidateQueries(["order-details", id]);
        }
    });

    if (isLoading)
        return <p className="py-10 text-center text-lg">Loading order details...</p>;

    if (isError || !order?._id)
        return <p className="py-10 text-center text-red-500">Order not found</p>;

    const isProcessing =
        updateTrackingMutation.isLoading || approveRejectMutation.isLoading;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 bg-white shadow-xl rounded-xl">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 border-b pb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 break-all">
                    Order #{order._id.slice(-8)}
                </h2>

                <span
                    className={`px-4 py-2 text-white font-semibold rounded-full capitalize text-sm sm:text-base w-fit ${statusColorMap[currentStatus]}`}
                >
                    {currentStatus}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-bold mb-2 text-blue-600">Customer Info</h3>
                    <p className="break-all"><strong>Email:</strong> {order.userEmail}</p>
                </div>

                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-bold mb-2 text-green-600">Product Info</h3>
                    <p><strong>Product:</strong> {order.productTitle}</p>
                    <p><strong>Quantity:</strong> {order.orderQty}</p>
                </div>

                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-bold mb-2 text-purple-600">Financials</h3>
                    <p><strong>Total:</strong> ${order.totalCost || 'N/A'}</p>
                    <p><strong>Payment:</strong> {order.paymentRequired ? 'Online' : 'COD'}</p>
                </div>
            </div>

            {currentStatus === 'pending' && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg mb-8 flex flex-col sm:flex-row sm:justify-between gap-4">
                    <p className="font-medium text-yellow-800">
                        Action required on this order
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <button
                            className="btn btn-sm btn-success text-white"
                            onClick={() => approveRejectMutation.mutate({ action: 'approve' })}
                            disabled={isProcessing}
                        >
                            <FaCheckCircle /> Approve
                        </button>

                        <button
                            className="btn btn-sm btn-error text-white"
                            onClick={() => {
                                const reason = prompt("Enter rejection reason:");
                                if (reason) {
                                    approveRejectMutation.mutate({ action: 'reject', reason });
                                }
                            }}
                            disabled={isProcessing}
                        >
                            <FaTimesCircle /> Reject
                        </button>
                    </div>
                </div>
            )}

            <div className="mb-8 p-4 sm:p-6 border rounded-lg">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <FaTruck /> Tracking History
                </h3>

                {currentTracking.length === 0 ? (
                    <p className="text-gray-500">No tracking history yet.</p>
                ) : (
                    <div className="space-y-4">
                        {currentTracking.map((t, i) => (
                            <div key={i} className="flex gap-3">
                                <div className={`w-3 h-3 rounded-full mt-2 ${statusColorMap[t.status]}`} />
                                <div>
                                    <p className="font-semibold capitalize">
                                        {t.status.replace(/_/g, ' ')}
                                    </p>
                                    {t.location && (
                                        <p className="text-sm flex items-center gap-1">
                                            <FaMapMarkerAlt /> {t.location}
                                        </p>
                                    )}
                                    {t.note && (
                                        <p className="text-sm italic text-gray-600">
                                            {t.note}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {(currentStatus === 'approved' ||
                currentStatus === 'paid' ||
                currentStatus === 'shipped') && (
                    <div className="p-4 sm:p-6 border rounded-lg bg-indigo-50">
                        <h3 className="font-bold text-xl mb-4 text-indigo-700">
                            Update Tracking Status
                        </h3>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            updateTrackingMutation.mutate({
                                status: statusUpdate,
                                location,
                                note
                            });
                        }} className="space-y-4">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <select
                                    className="select select-bordered w-full"
                                    value={statusUpdate}
                                    onChange={(e) => setStatusUpdate(e.target.value)}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="in_transit">In Transit</option>
                                    <option value="out_for_delivery">Out for Delivery</option>
                                    <option value="delivered">Delivered</option>
                                </select>

                                <input
                                    className="input input-bordered w-full"
                                    placeholder="Current Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            <textarea
                                className="textarea textarea-bordered w-full"
                                rows="2"
                                placeholder="Optional note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />

                            <button
                                className="btn btn-primary w-full text-white"
                                disabled={isProcessing || !statusUpdate}
                            >
                                {isProcessing ? "Updating..." : "Add Tracking Event"}
                            </button>
                        </form>
                    </div>
                )}
        </div>
    );
};

export default OrderDetails;
