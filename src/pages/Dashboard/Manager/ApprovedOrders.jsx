import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import moment from "moment/moment";


const TRACKING_STATUSES = [
    "Cutting Completed",
    "Sewing Started",
    "Finishing",
    "QC Checked",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
];

const ApprovedOrders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [trackingData, setTrackingData] = useState({
        location: '',
        note: '',
        status: TRACKING_STATUSES[0]
    });

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["approved-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/bookings/admin?status=approved");
            return res.data.bookings;
        },
    });

    const openTrackingModal = (order) => {
        setCurrentOrder(order);
        setIsModalOpen(true);
    };

    const handleTrackingSubmit = async (e) => {
        e.preventDefault();

        if (!currentOrder || !trackingData.location || !trackingData.status) {
            toast.error("Location and Status are required!");
            return;
        }

        try {
            const res = await axiosSecure.patch(`/bookings/${currentOrder._id}/tracking`, {
                location: trackingData.location,
                note: trackingData.note,
                status: trackingData.status,
            });

            if (res.data.modifiedCount) {
                toast.success(`Tracking updated for Order ID: ${currentOrder._id.slice(-4)}`);
                queryClient.invalidateQueries(["approved-orders"]);
                setIsModalOpen(false);
                setTrackingData({ location: '', note: '', status: TRACKING_STATUSES[0] });
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to add tracking!");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40 w-full my-10">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-indigo-700">Approved Orders ({orders.length})</h2>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th>#</th>
                            <th>Order ID</th>
                            <th className="hidden sm:table-cell">Users</th>
                            <th>Product</th>
                            <th className="hidden md:table-cell">Quantity</th>
                            <th className="hidden lg:table-cell">Approved Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o, i) => (
                            <tr key={o._id} className="hover:bg-gray-50">
                                <th>{i + 1}</th>
                                <td className="font-mono text-[10px] md:text-xs">
                                    {o._id.slice(-6)}...
                                </td>
                                <td className="hidden sm:table-cell text-sm">{o.userEmail}</td>
                                <td className="text-sm">{o.productTitle}</td>
                                <td className="font-semibold hidden md:table-cell">{o.orderQty}</td>
                                <td className="hidden lg:table-cell">
                                    {o.approvedAt ? moment(o.approvedAt).format('MMM D, YYYY') : 'N/A'}
                                </td>
                                <td className="flex flex-col sm:flex-row gap-2">
                                    <button onClick={() => openTrackingModal(o)} className="btn btn-xs md:btn-sm btn-info text-white">
                                        Tracking
                                    </button>
                                    <a href={`/dashboard/track-order/${o._id}`} className="btn btn-xs md:btn-sm btn-outline btn-success text-center">
                                        View
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                        <h3 className="font-bold text-xl mb-4">Add Tracking Update</h3>
                        <p className="text-sm mb-4">Order: {currentOrder?.productTitle}</p>
                        <form onSubmit={handleTrackingSubmit}>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">New Status</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={trackingData.status}
                                    onChange={(e) => setTrackingData({ ...trackingData, status: e.target.value })}
                                >
                                    {TRACKING_STATUSES.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Current Location*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Factory Floor C"
                                    className="input input-bordered w-full"
                                    value={trackingData.location}
                                    onChange={(e) => setTrackingData({ ...trackingData, location: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-control mb-6">
                                <label className="label">
                                    <span className="label-text">Note (Optional)</span>
                                </label>
                                <textarea
                                    placeholder="Details about the update..."
                                    className="textarea textarea-bordered h-24 w-full"
                                    value={trackingData.note}
                                    onChange={(e) => setTrackingData({ ...trackingData, note: e.target.value })}
                                />
                            </div>

                            <div className="modal-action flex justify-end space-x-3">
                                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-info text-white">Save Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ApprovedOrders;
