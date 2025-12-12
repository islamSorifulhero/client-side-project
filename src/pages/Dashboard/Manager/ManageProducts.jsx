// src/pages/Dashboard/Manager/ManageProducts.jsx
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ManageProducts = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["manager-products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/manager/get-manager");
            return res.data;
        },
    });
    console.log(products);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await axiosSecure.delete(`/products/${id}`);
            if (res.data.deletedCount) {
                toast.success("Product deleted successfully!");
                queryClient.invalidateQueries(["manager-products"]);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete product!");
        }
    };

    if (isLoading) return <p className="py-8 text-center">Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Products ({products.length})</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
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
                        {products?.map((p, i) => (
                            <tr key={p._id}>
                                <th>{i + 1}</th>
                                <td><img src={p.images?.[0] || ""} alt="" className="w-16 h-16 object-cover rounded" /></td>
                                <td>{p.name}</td>
                                <td>${p.price}</td>
                                <td>{p.category}</td>
                                <td>{p.paymentOption}</td>
                                <td>{p.showOnHome ? "Yes" : "No"}</td>
                                <td>
                                    <button onClick={() => handleDelete(p._id)} className="btn btn-sm btn-error">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;
