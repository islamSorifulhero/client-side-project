// src/pages/Dashboard/AddProduct.jsx
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddProduct = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = new FormData(e.target);
        const productData = {
            name: form.get("name"),
            description: form.get("description"),
            category: form.get("category"),
            price: parseFloat(form.get("price")),
            availableQty: parseInt(form.get("availableQty")),
            minimumOrder: parseInt(form.get("minimumOrder")),
            paymentOption: form.get("paymentOption"),
            images: form.getAll("images"),
            demoVideo: form.get("demoVideo"),
            showOnHome: form.get("showOnHome") === "on"
        };
        try {
            const { data } = await axiosSecure.post("/products", productData);
            if (data.insertedId) toast.success("Product added successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to add product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Product Name" className="input input-bordered w-full" required />
                <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" required />
                <input name="category" placeholder="Category" className="input input-bordered w-full" required />
                <input type="number" name="price" placeholder="Price" className="input input-bordered w-full" required />
                <input type="number" name="availableQty" placeholder="Available Quantity" className="input input-bordered w-full" required />
                <input type="number" name="minimumOrder" placeholder="Minimum Order Quantity" className="input input-bordered w-full" required />
                <input type="text" name="demoVideo" placeholder="Demo Video Link (Optional)" className="input input-bordered w-full" />
                <select name="paymentOption" className="select select-bordered w-full" required>
                    <option value="COD">Cash on Delivery</option>
                    <option value="PayFirst">PayFirst</option>
                </select>
                <input type="file" name="images" multiple className="file-input file-input-bordered w-full" required />
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="showOnHome" />
                    Show on Home Page
                </label>
                <button type="submit" className={`btn btn-primary w-full ${loading ? "loading" : ""}`}>
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
