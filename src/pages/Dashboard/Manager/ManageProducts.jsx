import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const ManageProducts = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["manager-products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/manager/get-manager");
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This product will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await axiosSecure.delete(`/products/${id}`);
            if (res.data.deletedCount > 0) {
                Swal.fire("Deleted!", "Product deleted successfully.", "success");
                queryClient.invalidateQueries(["manager-products"]);
            }
        } catch {
            Swal.fire("Failed!", "Failed to delete product.", "error");
        }
    };

    const handleUpdate = (id) => {
        navigate(`/dashboard/update-product/${id}`);
    };

    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                Manage Products ({filteredProducts.length}/{products.length})
            </h2>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name or category..."
                    className="input input-bordered w-full sm:max-w-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
                <table className="table w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Payment</th>
                            <th>Show on Home</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((p, i) => (
                            <tr key={p._id}>
                                <td>{i + 1}</td>
                                <td>
                                    <img
                                        src={p.images?.[0] || "placeholder.png"}
                                        alt={p.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td>{p.name}</td>
                                <td>${p.price}</td>
                                <td>{p.category}</td>
                                <td>{p.paymentOption}</td>
                                <td>{p.showOnHome ? "Yes" : "No"}</td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-xs btn-warning text-white"
                                        onClick={() => handleUpdate(p._id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-xs btn-error text-white"
                                        onClick={() => handleDelete(p._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden space-y-4">
                {filteredProducts.map((p) => (
                    <div
                        key={p._id}
                        className="border rounded-lg p-4 shadow bg-white"
                    >
                        <div className="flex gap-4 items-center">
                            <img
                                src={p.images?.[0] || "placeholder.png"}
                                alt={p.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                                <p className="font-semibold text-lg">{p.name}</p>
                                <p className="text-sm text-gray-500">
                                    {p.category}
                                </p>
                                <p className="font-mono">${p.price}</p>
                            </div>
                        </div>

                        <div className="mt-3 text-sm space-y-1">
                            <p><strong>Payment:</strong> {p.paymentOption}</p>
                            <p><strong>Show on Home:</strong> {p.showOnHome ? "Yes" : "No"}</p>
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                            <button
                                className="btn btn-sm btn-warning text-white w-full"
                                onClick={() => handleUpdate(p._id)}
                            >
                                Update
                            </button>
                            <button
                                className="btn btn-sm btn-error text-white w-full"
                                onClick={() => handleDelete(p._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <p className="text-center py-8 text-gray-500">
                    No products match your search.
                </p>
            )}
        </div>
    );
};

export default ManageProducts;
