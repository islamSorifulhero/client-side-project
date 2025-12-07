import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../../src/hooks/useAxiosPublic";

const FeaturedProducts = () => {
    const axiosPublic = useAxiosPublic();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["featuredProducts"],
        queryFn: async () => {
            const res = await axiosPublic.get("/products?featured=true&limit=6");
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Featured Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((p) => (
                    <motion.div
                        key={p._id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        className="card shadow-lg bg-base-100 rounded-xl"
                    >
                        <figure>
                            <img
                                src={p.images?.[0] || "https://i.ibb.co/CJmW8Rr/no-image.jpg"}
                                alt={p.name}
                                className="h-52 w-full object-cover rounded-t-xl"
                            />
                        </figure>

                        <div className="card-body">
                            <h2 className="text-xl font-bold">{p.name}</h2>
                            <p className="text-lg font-semibold text-primary">${p.price}</p>

                            <Link
                                to={`/product/${p._id}`}
                                className="btn btn-sm btn-primary mt-3"
                            >
                                View Details
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-8">
                <Link to="/all-products" className="btn btn-outline">
                    View All Products
                </Link>
            </div>
        </div>
    );
};

export default FeaturedProducts;
