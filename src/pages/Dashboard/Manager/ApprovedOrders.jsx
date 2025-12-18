import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import moment from "moment";

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

        if (!trackingData.location || !trackingData.status) {
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
                toast.success("Tracking updated successfully!");
                queryClient.invalidateQueries(["approved-orders"]);
                setIsModalOpen(false);
                setTrackingData({ location: '', note: '', status: TRACKING_STATUSES[0] });
            }
        } catch {
            toast.error("Failed to add tracking!");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-700">
                Approved Orders ({orders.length})
            </h2>

            <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
                <table className="table w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o, i) => (
                            <tr key={o._id}>
                                <td>{i + 1}</td>
                                <td className="font-mono">{o._id.slice(-6)}</td>
                                <td className="break-all">{o.userEmail}</td>
                                <td>{o.productTitle}</td>
                                <td>{o.orderQty}</td>
                                <td>
                                    {o.approvedAt
                                        ? moment(o.approvedAt).format("MMM D, YYYY")
                                        : "N/A"}
                                </td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => openTrackingModal(o)}
                                        className="btn btn-xs btn-info text-white"
                                    >
                                        Tracking
                                    </button>
                                    <a
                                        href={`/dashboard/track-order/${o._id}`}
                                        className="btn btn-xs btn-outline btn-success"
                                    >
                                        View
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden space-y-4">
                {orders.map((o) => (
                    <div key={o._id} className="border rounded-lg p-4 shadow bg-white">
                        <p className="text-sm text-gray-500 font-mono">
                            Order #{o._id.slice(-6)}
                        </p>

                        <p className="break-all">
                            <strong>User:</strong> {o.userEmail}
                        </p>
                        <p><strong>Product:</strong> {o.productTitle}</p>
                        <p><strong>Quantity:</strong> {o.orderQty}</p>
                        <p>
                            <strong>Date:</strong>{" "}
                            {o.approvedAt
                                ? moment(o.approvedAt).format("MMM D, YYYY")
                                : "N/A"}
                        </p>

                        <div className="mt-4 flex flex-col gap-2">
                            <button
                                onClick={() => openTrackingModal(o)}
                                className="btn btn-sm btn-info text-white w-full"
                            >
                                Add Tracking
                            </button>
                            <a
                                href={`/dashboard/track-order/${o._id}`}
                                className="btn btn-sm btn-outline btn-success w-full text-center"
                            >
                                View Details
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-xl">
                        <h3 className="font-bold text-xl mb-2">Add Tracking Update</h3>
                        <p className="text-sm mb-4">
                            Product: {currentOrder?.productTitle}
                        </p>

                        <form onSubmit={handleTrackingSubmit} className="space-y-4">
                            <select
                                className="select select-bordered w-full"
                                value={trackingData.status}
                                onChange={(e) =>
                                    setTrackingData({ ...trackingData, status: e.target.value })
                                }
                            >
                                {TRACKING_STATUSES.map(status => (
                                    <option key={status}>{status}</option>
                                ))}
                            </select>

                            <input
                                type="text"
                                placeholder="Current Location"
                                className="input input-bordered w-full"
                                value={trackingData.location}
                                onChange={(e) =>
                                    setTrackingData({ ...trackingData, location: e.target.value })
                                }
                                required
                            />

                            <textarea
                                placeholder="Note (optional)"
                                className="textarea textarea-bordered w-full"
                                rows="3"
                                value={trackingData.note}
                                onChange={(e) =>
                                    setTrackingData({ ...trackingData, note: e.target.value })
                                }
                            />

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn w-1/2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-info text-white w-1/2"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApprovedOrders;
