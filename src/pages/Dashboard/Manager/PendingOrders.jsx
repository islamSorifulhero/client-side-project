import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const PendingOrders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["pending-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/bookings/admin?status=pending");
            return res.data.bookings;
        },
    });

    const handleApprove = async (orderId) => {
        try {
            const res = await axiosSecure.patch(`/bookings/${orderId}/approve`);
            if (res.data.modifiedCount) {
                toast.success("Order approved!");
                queryClient.invalidateQueries(["pending-orders"]);
            }
        } catch {
            toast.error("Failed to approve order!");
        }
    };

    const handleReject = async (orderId) => {
        const result = await Swal.fire({
            title: "Reject Order",
            input: "textarea",
            inputPlaceholder: "Enter rejection reason...",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            preConfirm: (reason) => {
                if (!reason || reason.length < 3) {
                    Swal.showValidationMessage("Minimum 3 characters required");
                }
                return reason;
            },
        });

        if (!result.isConfirmed) return;

        try {
            const res = await axiosSecure.patch(
                `/bookings/${orderId}/reject`,
                { reason: result.value }
            );

            if (res.data.modifiedCount) {
                Swal.fire("Rejected!", "Order rejected successfully", "success");
                queryClient.invalidateQueries(["pending-orders"]);
            }
        } catch {
            Swal.fire("Error!", "Failed to reject order", "error");
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/dashboard/track-order/${id}`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="py-10 text-center bg-green-50 rounded-lg shadow">
                <h3 className="text-2xl font-semibold text-green-700">
                    🎉 No Pending Orders Found!
                </h3>
                <p className="text-gray-600 mt-2">
                    All current orders have been reviewed.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <h2 className="text-2xl font-bold mb-6">
                Pending Orders ({orders.length})
            </h2>

            <div className="hidden md:block overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
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
                                <td className="break-all">{o.userEmail}</td>
                                <td>{o.productTitle}</td>
                                <td>{o.orderQty}</td>
                                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-xs btn-success"
                                        onClick={() => handleApprove(o._id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn btn-xs btn-error"
                                        onClick={() => handleReject(o._id)}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        className="btn btn-xs btn-info text-white"
                                        onClick={() => handleViewDetails(o._id)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden space-y-4">
                {orders.map((o, i) => (
                    <div
                        key={o._id}
                        className="border rounded-lg p-4 shadow-sm bg-white"
                    >
                        <p className="text-sm text-gray-500 mb-1">
                            #{i + 1}
                        </p>

                        <p className="break-all">
                            <strong>User:</strong> {o.userEmail}
                        </p>
                        <p>
                            <strong>Product:</strong> {o.productTitle}
                        </p>
                        <p>
                            <strong>Quantity:</strong> {o.orderQty}
                        </p>
                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(o.createdAt).toLocaleDateString()}
                        </p>

                        <div className="mt-4 flex flex-col gap-2">
                            <button
                                className="btn btn-sm btn-success w-full"
                                onClick={() => handleApprove(o._id)}
                            >
                                Approve
                            </button>
                            <button
                                className="btn btn-sm btn-error w-full"
                                onClick={() => handleReject(o._id)}
                            >
                                Reject
                            </button>
                            <button
                                className="btn btn-sm btn-info w-full text-white"
                                onClick={() => handleViewDetails(o._id)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PendingOrders;
