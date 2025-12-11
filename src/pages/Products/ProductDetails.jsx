// src/pages/ProductDetails/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ProductDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { role } = useRole();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        axiosSecure
            .get(`/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                const min = res.data.minimumOrder ?? 1;
                const available = res.data.availableQty ?? res.data.quantity ?? 0;
                setQuantity(Math.min(Math.max(min, 1), available));
            })
            .catch((err) => {
                console.error("Product load error:", err);
                toast.error("Failed to load product.");
            })
            .finally(() => setLoading(false));
    }, [id, axiosSecure]);

    if (loading) return <p className="text-center py-8">Loading.....</p>;
    if (!product) return <p className="text-center py-8">Product not found.</p>;

    const minOrder = product.minimumOrder ?? 1;
    const available = product.availableQty ?? product.quantity ?? 0;

    const handleOrder = () => {
        if (!user) return navigate("/login");
        if (role !== "buyer") {
            toast.error("Only buyers can place an order!");
            return;
        }
        navigate(`/booking/${product._id}`);
    };

    const isRestricted = role === "admin" || role === "manager";

    return (
        <div className="max-w-3xl mx-auto p-5">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <img src={product.images?.[0] || product.image} alt={product.name} className="w-full mb-4" />
            <p className="mb-2">{product.description}</p>
            <p className="mb-2">Category: {product.category}</p>
            <p className="mb-2">Price: ${product.price}</p>
            <p className="mb-2">Available Quantity: {available}</p>
            <p className="mb-2">Minimum Order: {minOrder}</p>

            {!isRestricted ? (
                <button onClick={handleOrder} className="btn btn-primary mt-4">
                    Order / Book Now
                </button>
            ) : (
                <p className="text-red-500 mt-4">Admin/Manager cannot place orders.</p>
            )}
        </div>
    );
};

export default ProductDetails;
