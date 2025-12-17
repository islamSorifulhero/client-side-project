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
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        });

        if (!result.isConfirmed) return;

        try {
            const res = await axiosSecure.delete(`/products/${id}`);

            if (res.data.deletedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: "Product deleted successfully."
                });

                queryClient.invalidateQueries(["manager-products"]);
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Failed to delete product."
            });
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
            <div className="flex justify-center items-center h-40 w-full my-10">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-indigo-700">Manage Products ({filteredProducts.length}/{products.length})</h2>

            <div className="mb-6 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by name or category..."
                    className="input input-bordered w-full max-w-xs shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
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
                        {filteredProducts?.map((p, i) => (
                            <tr key={p._id} className="hover:bg-gray-50">
                                <th>{i + 1}</th>
                                <td><img src={p.images?.[0] || "placeholder.png"} alt={p.name} className="w-16 h-16 object-cover rounded" /></td>
                                <td>{p.name}</td>
                                <td className="font-mono">${p.price}</td>
                                <td>{p.category}</td>
                                <td>{p.paymentOption}</td>
                                <td>{p.showOnHome ? "Yes" : "No"}</td>
                                <td className="flex space-x-2 items-center h-24">
                                    <button
                                        onClick={() => handleUpdate(p._id)}
                                        className="btn btn-sm btn-warning text-white"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p._id)}
                                        className="btn btn-sm btn-error text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredProducts.length === 0 && !isLoading && (
                <p className="text-center py-8 text-gray-500">No products match your search or no products found.</p>
            )}

        </div>
    );
};

export default ManageProducts;