import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const BookingForm = () => {
  const { id } = useParams(); // expect route like /booking/:id  OR adjust if you use productId
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(0);
  const [cost, setCost] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axiosSecure.get(`/products/${id}`)
      .then(res => {
        const p = res.data;
        setProduct(p);
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

  const handleQtyChange = (value) => {
    if (!product) return;
    const min = product.minimumOrder ?? product.minOrder ?? 1;
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
    setCost((product.price || 0) * value);
  };

  const handlePlaceOrder = async (e) => {
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
      orderPrice: cost,

      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      phone: form.get("phone"),
      address: form.get("address"),
      notes: form.get("notes"),

      userEmail: user.email,
      paymentRequired: (product.paymentOption === "online") || !!product.paymentRequired,
      createdAt: new Date()
    };

    try {
      const { data } = await axiosSecure.post("/bookings", bookingData);

      if (!data.insertedId) {
        toast.error("Booking failed. Try again!");
        return;
      }

      toast.success("Booking created!");

      if (bookingData.paymentRequired) {
        // create checkout session on server
        const payRes = await axiosSecure.post("/create-checkout-session", {
          cost,
          bookingId: data.insertedId,
          productTitle: product.name,
          userEmail: user.email
        });
        // redirect browser to stripe checkout
        window.location.href = payRes.data.url;
        return;
      }

      // COD / no payment
      navigate("/dashboard/my-orders");
    } catch (err) {
      console.error("Place order error:", err);
      toast.error("Booking failed. Try again!");
    }
  };

  if (loading) return <p className="text-center py-8">Loading product...</p>;
  if (!product) return <p className="text-center py-8">Product not found.</p>;

  const min = product.minimumOrder ?? product.minOrder ?? 1;
  const available = product.availableQty ?? product.quantity ?? 0;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Book: {product.name}</h2>

      <form onSubmit={handlePlaceOrder} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="font-semibold">Email</label>
          <input type="email" value={user.email} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>

        <div>
          <label className="font-semibold">Product</label>
          <input type="text" value={product.name} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>

        <div>
          <label className="font-semibold">Price (each)</label>
          <input type="text" value={`$${product.price}`} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>

        <div>
          <label className="font-semibold">Order Quantity</label>
          <input
            type="number"
            min={min}
            max={available || undefined}
            value={qty}
            onChange={(e) => handleQtyChange(parseInt(e.target.value || 0))}
            className="input input-bordered w-full"
          />
          <p className="text-sm text-gray-500">Min: {min} {available ? `| Available: ${available}` : ""}</p>
        </div>

        <div>
          <label className="font-semibold">Total Price</label>
          <input type="text" value={`$${cost}`} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>

        <div>
          <label className="font-semibold">First Name</label>
          <input name="firstName" required className="input input-bordered w-full" />
        </div>

        <div>
          <label className="font-semibold">Last Name</label>
          <input name="lastName" required className="input input-bordered w-full" />
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

        <button className="btn btn-primary w-full mt-3">
          {product.paymentOption === "online" || product.paymentRequired ? "Proceed to Payment" : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
