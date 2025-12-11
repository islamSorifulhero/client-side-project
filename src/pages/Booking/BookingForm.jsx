// src/pages/BookingForm/BookingForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const BookingForm = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axiosSecure
      .get(`/products/${id}`)
      .then((res) => {
        const p = res.data;
        setProduct(p);
        const min = p.minimumOrder ?? 1;
        const available = p.availableQty ?? p.quantity ?? 0;
        const initialQty = Math.min(Math.max(min, 1), available);
        setQty(initialQty);
        setTotalPrice(initialQty * (p.price || 0));
      })
      .catch(() => toast.error("Failed to load product."))
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  const handleQtyChange = (value) => {
    if (!product) return;
    const min = product.minimumOrder ?? 1;
    const available = product.availableQty ?? product.quantity ?? 0;

    if (value < min) {
      toast.error(`Minimum order is ${min}`);
      value = min;
    }
    if (available && value > available) {
      toast.error(`Available quantity is ${available}`);
      value = available;
    }

    setQty(value);
    setTotalPrice(value * (product.price || 0));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.warning("Please login first.");
      return navigate("/login");
    }

    const form = new FormData(e.target);

    const bookingData = {
      productId: product._id,
      productTitle: product.name,
      productImage: product.images?.[0] || product.image || "",
      price: product.price,
      orderQty: qty,
      orderPrice: totalPrice,
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      phone: form.get("phone"),
      address: form.get("address"),
      notes: form.get("notes"),
      userEmail: user.email,
      paymentRequired: product.paymentOption === "online" || !!product.paymentRequired,
      createdAt: new Date()
    };

    try {
      const { data } = await axiosSecure.post("/bookings", bookingData);
      if (!data.insertedId) return toast.error("Booking failed");

      toast.success("Booking created!");

      if (bookingData.paymentRequired) {
        const payRes = await axiosSecure.post("/create-checkout-session", {
          cost: totalPrice,
          bookingId: data.insertedId,
          productTitle: product.name,
          userEmail: user.email
        });
        window.location.href = payRes.data.url;
        return;
      }

      navigate("/dashboard/my-orders");
    } catch (err) {
      console.error(err);
      toast.error("Booking failed!");
    }
  };

  if (loading) return <p className="text-center py-8">Loading product...</p>;
  if (!product) return <p className="text-center py-8">Product not found.</p>;

  const min = product.minimumOrder ?? 1;
  const available = product.availableQty ?? product.quantity ?? 0;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Book: {product.name}</h2>
      <form onSubmit={handleBooking} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label>Email</label>
          <input type="email" value={user.email} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>

        <div>
          <label>Product</label>
          <input type="text" value={product.name} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>

        <div>
          <label>Price (each)</label>
          <input type="text" value={`$${product.price}`} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>

        <div>
          <label>Order Quantity</label>
          <input
            type="number"
            min={min}
            max={available || undefined}
            value={qty}
            onChange={(e) => handleQtyChange(parseInt(e.target.value || 0))}
            className="input input-bordered w-full"
          />
          <p className="text-sm text-gray-500">Min: {min} | Available: {available}</p>
        </div>

        <div>
          <label>Total Price</label>
          <input type="text" value={`$${totalPrice}`} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>

        <div>
          <label>First Name</label>
          <input name="firstName" required className="input input-bordered w-full" />
        </div>

        <div>
          <label>Last Name</label>
          <input name="lastName" required className="input input-bordered w-full" />
        </div>

        <div>
          <label>Phone Number</label>
          <input name="phone" required className="input input-bordered w-full" />
        </div>

        <div>
          <label>Delivery Address</label>
          <textarea name="address" required className="textarea textarea-bordered w-full"></textarea>
        </div>

        <div>
          <label>Additional Notes</label>
          <textarea name="notes" className="textarea textarea-bordered w-full"></textarea>
        </div>

        <button className="btn btn-primary w-full mt-3">
          {product.paymentOption === "online" || product.paymentRequired ? "Proceed to Payment" : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
