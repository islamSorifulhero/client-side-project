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
            const res = await axiosPublic.get("/products?limit=8");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40 w-full my-10">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Featured Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                    <motion.div
                        key={p._id}
                        className="card shadow-lg rounded-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <figure>
                            <img
                                src={p.images}
                                alt={p.name}
                                className="h-52 w-full object-cover rounded-t-xl"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="text-xl font-bold">{p.name}</h2>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {p.description || "No description available"}
                            </p>
                            <p className="text-lg font-semibold text-primary">
                                ${p.price}
                            </p>

                            <Link
                                to={`/product/${p._id}`}
                                className="btn btn-sm btn-primary mt-2"
                            >
                                View Details
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-8">
                <Link to="/all-products" className="btn btn-outline animate__animated animate__pulse animate__infinite">
                    View All Products
                </Link>
            </div>
        </div>
    );
};

export default FeaturedProducts;
