// src/pages/Dashboard/AllProducts.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AllProducts = () => {
    const axiosSecure = useAxiosSecure();
    const { data: products = [], refetch } = useQuery({
        queryKey: ["all-products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/products");
            return res.data;
        }
    });

    const handleToggleHome = async (productId, currentState) => {
        try {
            await axiosSecure.patch(`/products/${productId}`, { showOnHome: !currentState });
            toast.success("Updated show on home status!");
            refetch();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Created By</th>
                            <th>Show on Home</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                            <tr key={p._id}>
                                <th>{i + 1}</th>
                                <td><img src={p.images?.[0]} alt={p.name} className="w-16 h-16 object-cover" /></td>
                                <td>{p.name}</td>
                                <td>${p.price}</td>
                                <td>{p.category}</td>
                                <td>{p.createdBy}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={p.showOnHome}
                                        onChange={() => handleToggleHome(p._id, p.showOnHome)}
                                        className="toggle toggle-primary"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProducts;
