import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTruck, FaCheckCircle, FaTimesCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';

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
    const navigate = useNavigate();

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
        mutationFn: (updatePayload) =>
            axiosSecure.patch(`/bookings/${id}/tracking`, updatePayload),
        onSuccess: () => {
            toast.success(`Tracking updated to ${statusUpdate.toUpperCase()}`);
            queryClient.invalidateQueries(["order-details", id]); // ডেটা রি-ফেচ
            setStatusUpdate('');
            setNote('');
            setLocation('');
        },
        onError: (error) => {
            toast.error("Failed to update tracking: " + (error.response?.data?.message || 'Server error'));
        }
    });

    const approveRejectMutation = useMutation({
        mutationFn: ({ action, reason }) => {
            if (action === 'approve') {
                return axiosSecure.patch(`/bookings/${id}/approve`);
            }
            if (action === 'reject') {
                return axiosSecure.patch(`/bookings/${id}/reject`, { reason });
            }
        },
        onSuccess: (data, variables) => {
            const newStatus = variables.action === 'approve' ? 'approved' : 'rejected';
            toast.success(`Order successfully marked as ${newStatus.toUpperCase()}.`);
            queryClient.invalidateQueries(["order-details", id]);
            queryClient.invalidateQueries(["all-orders"]);
        },
        onError: (error) => {
            toast.error("Operation failed: " + (error.response?.data?.message || 'Server error'));
        }
    });

    const handleTrackingUpdate = (e) => {
        e.preventDefault();
        if (!statusUpdate) {
            return toast.error("Please select a tracking status.");
        }

        const payload = {
            status: statusUpdate,
            location: location,
            note: note,
        };

        updateTrackingMutation.mutate(payload);
    };

    if (isLoading) return <p className="py-8 text-center text-xl">Loading order details...</p>;
    if (isError || !order || !order._id) return (
        <p className="py-8 text-center text-red-500">Failed to load order or Order not found.</p>
    );

    const isProcessing = updateTrackingMutation.isLoading || approveRejectMutation.isLoading;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-xl">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h2 className="text-4xl font-bold text-gray-800">
                    Order #{order._id.slice(-8)} Details
                </h2>
                <span className={`px-4 py-2 text-white font-semibold rounded-full capitalize ${statusColorMap[currentStatus] || 'bg-gray-400'}`}>
                    {currentStatus}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-bold text-xl mb-3 text-blue-600">Customer Info</h3>
                    <p><strong>Email:</strong> {order.userEmail}</p>
                </div>

                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-bold text-xl mb-3 text-green-600">Product Info</h3>
                    <p><strong>Product:</strong> {order.productTitle}</p>
                    <p><strong>Quantity:</strong> {order.orderQty}</p>
                </div>

                <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-bold text-xl mb-3 text-purple-600">Financials</h3>
                    <p><strong>Total Cost:</strong> ${order.totalCost || 'N/A'}</p>
                    <p><strong>Payment:</strong> {order.paymentRequired ? (order.transactionId ? 'Paid (Online)' : 'Pending Online') : 'Cash on Delivery (COD)'}</p>
                </div>
            </div>

            {(currentStatus === 'pending') && (
                <div className="alert alert-warning mb-8 flex justify-between items-center p-4 rounded-lg bg-yellow-100 border-yellow-500 border-l-4">
                    <span className="text-lg font-medium text-yellow-800">Review Required: Action on this order is needed.</span>
                    <div>
                        <button
                            className="btn btn-sm btn-success text-white mr-3"
                            onClick={() => approveRejectMutation.mutate({ action: 'approve' })}
                            disabled={isProcessing}
                        >
                            <FaCheckCircle /> Approve Order
                        </button>
                        <button
                            className="btn btn-sm btn-error text-white"
                            onClick={() => {
                                const reason = prompt("Enter rejection reason:");
                                if (reason) {
                                    approveRejectMutation.mutate({ action: 'reject', reason });
                                } else if (reason !== null) {
                                    toast.error("Rejection cancelled or no reason provided.");
                                }
                            }}
                            disabled={isProcessing}
                        >
                            <FaTimesCircle /> Reject Order
                        </button>
                    </div>
                </div>
            )}

            <div className="mb-8 p-6 border rounded-lg shadow-md">
                <h3 className="font-bold text-2xl mb-4 flex items-center text-gray-700">
                    <FaTruck className="mr-3 text-lg" /> Tracking History (ID: {order.trackingId || 'N/A'})
                </h3>

                <div className="space-y-6">
                    {currentTracking.length === 0 ? (
                        <p className="text-gray-500">No tracking history recorded yet.</p>
                    ) : (
                        currentTracking.map((track, index) => (
                            <div key={index} className={`flex ${index === currentTracking.length - 1 ? '' : 'border-l-2 border-dashed ml-3 pl-6'}`}>
                                <div className={`w-3 h-3 rounded-full mt-1.5 ${statusColorMap[track.status] || 'bg-gray-400'} -ml-[13.5px] mr-4`}></div>
                                <div>
                                    <p className="font-semibold capitalize text-lg">{track.status.replace(/_/g, ' ')}</p>

                                    {track.location && <p className="text-sm flex items-center"><FaMapMarkerAlt className='mr-1' /> {track.location}</p>}
                                    {track.note && <p className="text-sm italic text-gray-600">Note: {track.note}</p>}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {(currentStatus === 'approved' || currentStatus === 'shipped' || currentStatus === 'paid') && (
                <div className="p-6 border rounded-lg bg-indigo-50">
                    <h3 className="font-bold text-2xl mb-4 text-indigo-700">Update Tracking Status</h3>
                    <form onSubmit={handleTrackingUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <select
                                    className="select select-bordered w-full"
                                    value={statusUpdate}
                                    onChange={(e) => setStatusUpdate(e.target.value)}
                                    required
                                >
                                    <option value="">Select New Status</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="in_transit">In Transit</option>
                                    <option value="out_for_delivery">Out for Delivery</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Current Location (e.g., Dhaka Hub)"
                                    className="input input-bordered w-full"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <textarea
                                placeholder="Add a note or instruction (optional)"
                                className="textarea textarea-bordered w-full"
                                rows="2"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full text-white"
                            disabled={isProcessing || !statusUpdate}
                        >
                            {isProcessing ? 'Updating...' : 'Add Tracking Event'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;