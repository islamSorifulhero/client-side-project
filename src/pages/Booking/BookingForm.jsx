import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const BookingForm = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(0);
    const [cost, setCost] = useState(0);

    useEffect(() => {
        axiosSecure.get(`/products/${id}`).then((res) => {
            setProduct(res.data);
            setQty(res.data?.minOrder || 1);
            setCost((res.data?.price || 0) * (res.data?.minOrder || 1));
        });
    }, [axiosSecure, id]);

    const handleQtyChange = (value) => {
        if (!product) return;

        if (value < product.minOrder) {
            toast.error(`Minimum order is ${product.minOrder}`);
            setQty(product.minOrder);
            setCost(product.price * product.minOrder);
            return;
        }

        if (value > product.quantity) {
            toast.error(`Available quantity is ${product.quantity}`);
            setQty(product.quantity);
            setCost(product.price * product.quantity);
            return;
        }

        setQty(value);
        setCost(product.price * value);
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const bookingData = {
            productId: product._id,
            productTitle: product.name,
            productImage: product.image,
            price: product.price,
            orderQty: qty,
            orderCost: cost,

            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            notes: formData.get("notes"),

            userEmail: user.email,
            paymentRequired: product.paymentOption === "online",
        };

        // 1️⃣ Save booking to DB first
        const { data } = await axiosSecure.post("/bookings", bookingData);

        if (!data.insertedId) {
            toast.error("Booking failed. Try again!");
            return;
        }

        toast.success("Booking created!");

        // 2️⃣ If online payment → redirect to Stripe
        if (product.paymentOption === "online") {
            const payRes = await axiosSecure.post("/create-checkout-session", {
                cost,
                bookingId: data.insertedId,
                productTitle: product.name,
                userEmail: user.email,
            });

            window.location.href = payRes.data.url;
            return;
        }

        // 3️⃣ For Cash On Delivery → redirect to My Orders
        navigate("/dashboard/my-orders");
    };

    if (!product)
        return (
            <p className="text-center py-10 text-xl">Loading product details...</p>
        );

    return (
        <div className="max-w-3xl mx-auto p-5">
            <h2 className="text-2xl font-bold mb-4">Book: {product.name}</h2>

            <form onSubmit={handlePlaceOrder} className="space-y-4 bg-white p-6 rounded-lg shadow">

                {/* Email */}
                <div>
                    <label className="font-semibold">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* Product Title */}
                <div>
                    <label className="font-semibold">Product</label>
                    <input
                        type="text"
                        value={product.name}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="font-semibold">Price (each)</label>
                    <input
                        type="text"
                        value={`$${product.price}`}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* Quantity */}
                <div>
                    <label className="font-semibold">Order Quantity</label>
                    <input
                        type="number"
                        min={product.minOrder}
                        max={product.quantity}
                        value={qty}
                        onChange={(e) => handleQtyChange(parseInt(e.target.value))}
                        className="input input-bordered w-full"
                    />
                    <p className="text-sm text-gray-500">
                        Min: {product.minOrder} | Available: {product.quantity}
                    </p>
                </div>

                {/* Total Cost */}
                <div>
                    <label className="font-semibold">Total Price</label>
                    <input
                        type="text"
                        value={`$${cost}`}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* First Name */}
                <div>
                    <label className="font-semibold">First Name</label>
                    <input name="firstName" required className="input input-bordered w-full" />
                </div>

                {/* Last Name */}
                <div>
                    <label className="font-semibold">Last Name</label>
                    <input name="lastName" required className="input input-bordered w-full" />
                </div>

                {/* Phone */}
                <div>
                    <label className="font-semibold">Phone Number</label>
                    <input name="phone" required className="input input-bordered w-full" />
                </div>

                {/* Address */}
                <div>
                    <label className="font-semibold">Delivery Address</label>
                    <textarea
                        name="address"
                        required
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                </div>

                {/* Notes */}
                <div>
                    <label className="font-semibold">Additional Notes</label>
                    <textarea name="notes" className="textarea textarea-bordered w-full"></textarea>
                </div>

                {/* ORDER BUTTON */}
                <button className="btn btn-primary w-full mt-3">
                    {product.paymentOption === "online"
                        ? "Proceed to Payment"
                        : "Place Order"}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
