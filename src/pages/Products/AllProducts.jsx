import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router";
import { motion } from "framer-motion";

const AllProducts = () => {
    const axiosPublic = useAxiosPublic();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosPublic.get("/products")
            .then(res => {
                console.log("PRODUCTS LOADED:", res.data);
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log("PRODUCT ERROR:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="h-[70vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <motion.div
            className="max-w-6xl mx-auto px-4 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h2
                className="text-3xl font-bold text-center mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                All Products
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? products.map((product, index) => (
                    <motion.div
                        key={product._id}
                        className="card bg-base-100 shadow-xl border overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                        <figure className="h-52 overflow-hidden">
                            <motion.img
                                src={product.images?.[0] || "/placeholder.png"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </figure>

                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>

                            <p className="text-sm text-gray-500">
                                Category: <span className="font-semibold">{product.category}</span>
                            </p>

                            <p className="mt-1 font-semibold">
                                Price: ${product.price}
                            </p>

                            <p className="text-sm">
                                Available: {product.availableQty}
                            </p>

                            <div className="card-actions justify-end mt-4">
                                <Link to={`/product/${product._id}`}>
                                    <motion.button
                                        className="btn btn-primary btn-sm"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View Details
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )) : (
                    <p className="text-center text-gray-500 mt-10">
                        No products available (API returned empty).
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default AllProducts;
