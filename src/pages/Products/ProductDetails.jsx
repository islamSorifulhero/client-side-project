// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const { productId } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderQty, setOrderQty] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        contactNumber: "",
        deliveryAddress: "",
        additionalNotes: ""
    });

    useEffect(() => {
        axiosPublic.get(`/products/${productId}`)
            .then(res => {
                setProduct(res.data);
                setOrderQty(res.data?.minimumOrder || 1);
                setLoading(false);
            })
            .catch(err => {
                console.log("PRODUCT FETCH ERROR:", err);
                toast.error("Failed to load product.");
                setLoading(false);
            });
    }, [productId]);

    if (loading) return <p className="text-center py-20">Loading...</p>;
    if (!product) return <p className="text-center py-20">Product not found</p>;

    const handleInputChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleQtyChange = e => {
        let val = parseInt(e.target.value) || 0;
        if (val > product.availableQty) val = product.availableQty;
        if (val < product.minimumOrder) val = product.minimumOrder;
        setOrderQty(val);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!user || user.role === "admin" || user.role === "manager") {
            toast.warning("Only regular users can place an order.");
            return;
        }

        const booking = {
            userEmail: user.email,
            productId: product._id,
            productTitle: product.name,
            price: product.price,
            orderQty,
            orderPrice: orderQty * product.price,
            ...formData,
            createdAt: new Date()
        };

        try {
            const res = await axiosPublic.post("/bookings", booking);
            const bookingId = res.data.insertedId;

            if (product.paymentRequired) {
                toast.info("Redirecting to payment...");
                // Create Stripe Checkout session
                const stripeRes = await axiosPublic.post("/create-checkout-session", {
                    bookingId,
                    amount: orderQty * product.price,
                    productTitle: product.name,
                    userEmail: user.email
                });
                window.location.href = stripeRes.data.url; // redirect to Stripe
            } else {
                toast.success("Booking successful! Check Dashboard → My Orders.");
                navigate("/dashboard/my-orders");
            }
        } catch (err) {
            console.log("Booking Error:", err);
            toast.error("Booking failed. Try again.");
        }
    };

    return (
        <motion.div
            className="max-w-5xl mx-auto px-4 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Media */}
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

                {/* Product Info & Booking */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-600">{product.description}</p>

                    <div className="space-y-1">
                        <p>Category: <span className="font-semibold">{product.category}</span></p>
                        <p>Price: <span className="font-semibold">${product.price}</span></p>
                        <p>Available Quantity: <span className="font-semibold">{product.availableQty}</span></p>
                        <p>Minimum Order: <span className="font-semibold">{product.minimumOrder}</span></p>
                        {product.features?.length > 0 && (
                            <div>
                                <h3 className="font-semibold">Features:</h3>
                                <ul className="list-disc ml-5">
                                    {product.features.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>

                    {user && user.role !== "admin" && user.role !== "manager" ? (
                        <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    className="input input-bordered w-full"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <input
                                type="email"
                                value={user.email}
                                readOnly
                                className="input input-bordered w-full"
                            />

                            <input
                                type="text"
                                value={product.name}
                                readOnly
                                className="input input-bordered w-full"
                            />

                            <input
                                type="number"
                                min={product.minimumOrder}
                                max={product.availableQty}
                                value={orderQty}
                                onChange={handleQtyChange}
                                className="input input-bordered w-full"
                                placeholder="Order Quantity"
                                required
                            />

                            <input
                                type="text"
                                value={orderQty * product.price}
                                readOnly
                                className="input input-bordered w-full"
                                placeholder="Total Price"
                            />

                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                placeholder="Contact Number"
                                required
                                className="input input-bordered w-full"
                            />

                            <textarea
                                name="deliveryAddress"
                                value={formData.deliveryAddress}
                                onChange={handleInputChange}
                                placeholder="Delivery Address"
                                required
                                className="input input-bordered w-full h-24"
                            />

                            <textarea
                                name="additionalNotes"
                                value={formData.additionalNotes}
                                onChange={handleInputChange}
                                placeholder="Additional Notes / Instructions"
                                className="input input-bordered w-full h-20"
                            />

                            <button type="submit" className="btn btn-primary w-full">
                                {product.paymentRequired ? "Proceed to Payment" : "Place Order"}
                            </button>
                        </form>
                    ) : (
                        <p className="text-red-500">
                            Only logged-in users (not Admin/Manager) can place an order.
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetails;
