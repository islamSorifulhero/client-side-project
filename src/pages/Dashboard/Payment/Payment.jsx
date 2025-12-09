import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const Payment = () => {
    const { productId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/products/${productId}`).then((res) => {
            setProduct(res.data);
        });
    }, [productId, axiosSecure]);

    if (!product) return <p>Loading...</p>;

    const handlePay = async () => {
        try {
            const bookingRes = await axiosSecure.post("/bookings", {
                userEmail: user.email,
                productId: product._id,
                productTitle: product.name,
                orderQty: 1,
                orderPrice: product.price,
            });

            const bookingId = bookingRes.data.insertedId;

            const { data } = await axiosSecure.post("/create-checkout-session", {
                cost: product.price,
                bookingId,
                productTitle: product.name,
            });

            window.location.href = data.url;
        } catch (error) {
            console.log(error);
            alert("Payment failed!");
        }
    };

    return (
        <div className="max-w-lg mx-auto py-10">
            <h2 className="text-3xl font-bold mb-4">Payment for {product.name}</h2>
            <p className="text-xl mb-6">Price: ${product.price}</p>

            <button
                onClick={handlePay}
                className="btn btn-primary w-full text-lg"
            >
                Pay Now
            </button>
        </div>
    );
};

export default Payment;
