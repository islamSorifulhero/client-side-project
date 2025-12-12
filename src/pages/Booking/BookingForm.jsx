import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  const [paymentOption, setPaymentOption] = useState("COD");
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

        const min = p.minimumOrder ?? p.minOrder ?? 1;
        const available = p.availableQty ?? p.quantity ?? 0;
        const initialQty = Math.min(Math.max(min, 1), available || min);
        setQty(initialQty);
        setCost((p.price || 0) * initialQty);

        setLoading(false);
      })
      .catch(err => {
        console.error("Product load error:", err);
        toast.error("Failed to load product.");
        setLoading(false);
      });
  }, [id, axiosSecure]);

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

    const isOnlinePayment = paymentOption === "Stripe" || paymentOption === "PayFast";

    const form = new FormData(e.target);
    const bookingData = {
      productId: product._id,
      productTitle: product.name,
      productImage: product.images?.[0] || product.image || "",
      price: product.price,
      orderQty: qty,
      orderPrice: cost,

      paymentOption: paymentOption,

      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      phone: form.get("phone"),
      address: form.get("address"),
      notes: form.get("notes"),

      userEmail: user.email,
      createdAt: new Date()
    };

    try {
      const { data } = await axiosSecure.post("/bookings", bookingData);

      if (!data.insertedId) {
        toast.error("Booking failed. Server response invalid.");
        return;
      }

      if (isOnlinePayment) {
        const payRes = await axiosSecure.post("/create-checkout-session", {
          cost,
          bookingId: data.insertedId,
          productTitle: product.name,
          userEmail: user.email
        });

        window.location.replace(payRes.data.url);
        return;
      }

      toast.success("Order placed successfully (COD)!");
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

  const buttonText = paymentOption === "COD" ? "Place Order (COD)" : "Proceed to Payment";


  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Confirm Order: {product.name}</h2>

      <form onSubmit={handlePlaceOrder} className="space-y-4 bg-white p-6 rounded-lg shadow">
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

        <div>
          <label className="font-semibold">Total Price</label>
          <input type="text" value={`$${cost.toFixed(2)}`} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>

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
          <label className="font-semibold">Payment Options</label>
          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="COD">Cash on Delivery (COD)</option>
            <option value="Stripe">Online Payment (Stripe)</option>
          </select>
        </div>


        <div>
          <label className="font-semibold">Additional Notes</label>
          <textarea name="notes" className="textarea textarea-bordered w-full"></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-3 text-white">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;