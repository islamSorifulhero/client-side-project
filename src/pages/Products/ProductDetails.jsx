import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const { productId } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Note: '/products/:id' is a public route, use useAxiosPublic if available
        // Using axiosSecure here, assuming backend handles public access
        axiosSecure.get(`/products/${productId}`) 
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log("PRODUCT FETCH ERROR:", err);
                toast.error("Failed to load product.");
                setLoading(false);
            });
    }, [productId, axiosSecure]);

    if (loading) return <p className="text-center py-20">Loading...</p>;
    if (!product) return <p className="text-center py-20">Product not found</p>;

    const isBuyer = user && user.role !== "admin" && user.role !== "manager";

    return (
        <motion.div
            className="max-w-5xl mx-auto px-4 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* --- Product Images/Media --- */}
                <div className="space-y-4">
                    {product.images?.length > 0 ? (
                        product.images.map((img, index) => (
                            <motion.img
                                key={index}
                                src={img}
                                alt={product.name}
                                className="w-full rounded-lg shadow-md"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            />
                        ))
                    ) : product.video ? (
                        <video
                            src={product.video}
                            controls
                            className="w-full rounded-lg shadow-md"
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                            No media available
                        </div>
                    )}
                </div>

                {/* --- Product Info & Booking Action --- */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-600">{product.description}</p>

                    <div className="space-y-1">
                        <p>Category: <span className="font-semibold">{product.category}</span></p>
                        <p>Price: <span className="font-semibold">${product.price}</span></p>
                        <p>Available Quantity: <span className="font-semibold">{product.availableQty}</span></p>
                        <p>Minimum Order: <span className="font-semibold">{product.minimumOrder}</span></p>
                    </div>

                    {isBuyer ? (
                        <button 
                            onClick={() => navigate(`/booking/${product._id}`)}
                            className="btn btn-primary w-full mt-4 text-white"
                        >
                            Place Order / Proceed to Booking Form
                        </button>
                    ) : user ? (
                        <p className="text-red-500">Admins and Managers cannot place orders.</p>
                    ) : (
                        <p className="text-red-500">Please log in to place an order.</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetails;