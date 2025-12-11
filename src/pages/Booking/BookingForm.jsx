import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const BookingForm = () => {
  const { id } = useParams(); // Product ID
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(0);
  const [cost, setCost] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Load Product Data
  useEffect(() => {
    if (!id) {
      setLoading(false);
      toast.error("Invalid product link.");
      return;
    }
    setLoading(true);
    axiosSecure.get(`/products/${id}`)
      .then(res => {
        const p = res.data;
        if (!p) {
          toast.error("Product not found.");
          setLoading(false);
          return;
        }
        setProduct(p);
        // Calculate initial quantity based on product limits
        const min = p.minimumOrder ?? p.minOrder ?? 1;
        const available = p.availableQty ?? p.quantity ?? 0;
        const initialQty = Math.min(Math.max(min, 1), available || min);
        setQty(initialQty);
        setCost((p.price || 0) * initialQty);
      })
      .catch(err => {
        console.error("Product load error:", err);
        toast.error("Failed to load product.");
      })
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  // 2. Handle Quantity Change
  const handleQtyChange = (value) => {
    if (!product) return;
    let validatedValue = parseInt(value || 0);

    const min = product.minimumOrder ?? product.minOrder ?? 1;
    const available = product.availableQty ?? product.quantity ?? 0;

    if (validatedValue < min) {
      toast.error(`Minimum order is ${min}`);
      validatedValue = min;
    }
    if (available && validatedValue > available) {
      toast.error(`Available quantity is ${available}`);
      validatedValue = available;
    }
    setQty(validatedValue);
    setCost((product.price || 0) * validatedValue);
  };

  // 3. Handle Form Submission (Place Order)
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.warning("Please login first.");
      return navigate("/login");
    }
    if (!product) {
      toast.error("Product data missing.");
      return;
    }

    const form = new FormData(e.target);
    const bookingData = {
      productId: product._id,
      productTitle: product.name,
      productImage: product.images?.[0] || product.image || "",
      price: product.price,
      orderQty: qty,
      orderPrice: cost,

      // Form Fields
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      phone: form.get("phone"),
      address: form.get("address"),
      notes: form.get("notes"),

      userEmail: user.email,
      paymentRequired: product.paymentRequired || (product.paymentOption === "online"),
      createdAt: new Date()
    };

    try {
      // POST request to Server (Server checked for 404 in Section 1)
      const { data } = await axiosSecure.post("/bookings", bookingData);

      if (!data.insertedId) {
        toast.error("Booking failed. Server response invalid.");
        return;
      }

      toast.success("Booking created!");

      if (bookingData.paymentRequired) {
        // Payment requires further steps (Stripe checkout)
        const payRes = await axiosSecure.post("/create-checkout-session", {
          cost,
          bookingId: data.insertedId,
          productTitle: product.name,
          userEmail: user.email
        });

        // Redirect to payment gateway
        window.location.href = payRes.data.url;
        return;
      }

      // COD / No payment required
      navigate("/dashboard/my-orders");
    } catch (err) {
      console.error("Place order error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Booking failed. Try again!");
    }
  };

  if (loading) return <p className="text-center py-8">Loading product...</p>;
  if (!product) return <p className="text-center py-8">Product not found. <button onClick={() => navigate('/all-products')} className="btn btn-link">Go to All Products</button></p>;

  const min = product.minimumOrder ?? product.minOrder ?? 1;
  const available = product.availableQty ?? product.quantity ?? 0;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Confirm Order: {product.name}</h2>

      <form onSubmit={handlePlaceOrder} className="space-y-4 bg-white p-6 rounded-lg shadow">
        {/* --- Read-Only Fields --- */}
        <div>
          <label className="font-semibold">Email</label>
          <input type="email" value={user?.email || "N/A"} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>
        <div>
          <label className="font-semibold">Product</label>
          <input type="text" value={product.name} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>
        <div>
          <label className="font-semibold">Price (each)</label>
          <input type="text" value={`$${product.price}`} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>

        {/* --- Quantity Input --- */}
        <div>
          <label className="font-semibold">Order Quantity</label>
          <input
            type="number"
            min={min}
            max={available || undefined}
            value={qty}
            onChange={(e) => handleQtyChange(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <p className="text-sm text-gray-500">Min: {min} {available ? `| Available: ${available}` : ""}</p>
        </div>

        {/* --- Total Price --- */}
        <div>
          <label className="font-semibold">Total Price</label>
          <input type="text" value={`$${cost.toFixed(2)}`} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>

        {/* --- Delivery Fields --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">First Name</label>
            <input name="firstName" required className="input input-bordered w-full" />
          </div>
          <div>
            <label className="font-semibold">Last Name</label>
            <input name="lastName" required className="input input-bordered w-full" />
          </div>
        </div>

        <div>
          <label className="font-semibold">Phone Number</label>
          <input name="phone" required className="input input-bordered w-full" />
        </div>

        <div>
          <label className="font-semibold">Delivery Address</label>
          <textarea name="address" required className="textarea textarea-bordered w-full"></textarea>
        </div>

        <div>
          <label className="font-semibold">Additional Notes</label>
          <textarea name="notes" className="textarea textarea-bordered w-full"></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-3 text-white">
          {product.paymentRequired || product.paymentOption === "online" ? "Proceed to Payment" : "Place Order (COD)"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;