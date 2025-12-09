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

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-3">All Products ({products.length})</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Qty</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p, i) => (
                            <tr key={p._id}>
                                <td>{i + 1}</td>
                                <td>{p.title}</td>
                                <td>{p.category}</td>
                                <td>${p.price}</td>
                                <td>{p.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProducts;
