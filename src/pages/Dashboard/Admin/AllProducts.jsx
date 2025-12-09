// src/pages/Dashboard/Admin/AllProducts.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllProducts = () => {
    const axiosSecure = useAxiosSecure();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["all-products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/products");
            return res.data;
        },
    });

    if (isLoading) return <p className="py-8 text-center">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">All Products ({products.length})</h2>
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
                                <td><img src={p.images?.[0] || ""} alt="" className="w-16 h-16 object-cover rounded" /></td>
                                <td>{p.name}</td>
                                <td>${p.price}</td>
                                <td>{p.category}</td>
                                <td>{p.createdBy || "—"}</td>
                                <td>{p.showOnHome ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProducts;
