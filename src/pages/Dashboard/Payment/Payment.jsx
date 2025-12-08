import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Stripe setup
const stripePromise = loadStripe("pk_test_****************");

const CheckoutForm = ({ amount, bookingData, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);

        try {
            const { data } = await axiosSecure.post('/create-payment-intent', { amount });
            const clientSecret = data.clientSecret;

            const card = elements.getElement(CardElement);
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card, billing_details: { email: bookingData.email } },
            });

            if (result.error) {
                alert(result.error.message);
                setProcessing(false);
            } else if (result.paymentIntent.status === "succeeded") {
                // Save booking
                await axiosSecure.post('/bookings', {
                    ...bookingData,
                    paymentStatus: "Paid",
                    transactionId: result.paymentIntent.id,
                });
                onSuccess();
            }
        } catch (err) {
            console.log(err);
            setProcessing(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-3 border rounded" />
            <button type="submit" className="btn btn-primary w-full" disabled={!stripe || processing}>
                {processing ? "Processing..." : `Pay $${amount}`}
            </button>
        </form>
    );
};

const Payment = () => {
    const { productId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [bookingData, setBookingData] = useState(null);
    const [product, setProduct] = useState(null);

    React.useEffect(() => {
        axiosSecure.get(`/products/${productId}`)
            .then(res => {
                setProduct(res.data);
            });
    }, [productId, axiosSecure]);

    if (!product) return <div>Loading product...</div>;

    const handleSuccess = () => alert("Booking & Payment Successful!");

    return (
        <div className="max-w-xl mx-auto py-10">
            <h2 className="text-3xl font-bold mb-4">Pay for {product.name}</h2>
            <p>Price: ${product.price}</p>

            <Elements stripe={stripePromise}>
                <CheckoutForm
                    amount={product.price}
                    bookingData={{
                        email: user.email,
                        productId: product._id,
                        productTitle: product.name,
                        price: product.price,
                    }}
                    onSuccess={handleSuccess}
                />
            </Elements>
        </div>
    );
};

export default Payment;



// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import { useParams } from 'react-router';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const Payment = () => {
//     const { parcelId } = useParams();
//     const axiosSecure = useAxiosSecure();

//     const { isLoading, data: parcel } = useQuery({
//         queryKey: ['parcels', parcelId],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/parcels/${parcelId}`);
//             return res.data;
//         }
//     })

//     const handlePayment = async() => {
//         const paymentInfo = {
//             cost: parcel.cost,
//             parcelId: parcel._id,
//             senderEmail: parcel.senderEmail,
//             parcelName: parcel.parcelName
//         }

//         const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

//         console.log(res.data);

//         window.location.href = res.data.url;
//     }

//     if (isLoading) {
//         return <div>
//             <span className="loading loading-infinity loading-xl"></span>
//         </div>
//     }

//     return (
//         <div>
//             <h2>Please Pay ${parcel.cost} for : {parcel.parcelName} </h2>
//             <button onClick={handlePayment} className='btn btn-primary text-black'>Pay</button>
//         </div>
//     );
// };

// export default Payment;