import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const AddProduct = () => {
    const axiosSecure = useAxiosSecure();

    const handleAdd = async (e) => {
        e.preventDefault();
        const form = e.target;

        const product = {
            title: form.title.value,
            category: form.category.value,
            price: Number(form.price.value),
            quantity: Number(form.quantity.value),
            minQty: Number(form.minQty.value),
            description: form.description.value,
            paymentOption: form.paymentOption.value
        };

        const res = await axiosSecure.post("/products", product);

        if (res.data.insertedId) {
            toast.success("Product Added!");
            form.reset();
        }
    };

    return (
        <div className="max-w-xl p-6">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>

            <form onSubmit={handleAdd} className="space-y-4">
                <input className="input input-bordered w-full" name="title" placeholder="Product Title" required />
                <input className="input input-bordered w-full" name="category" placeholder="Category" required />
                <input className="input input-bordered w-full" name="price" placeholder="Price" type="number" required />
                <input className="input input-bordered w-full" name="quantity" placeholder="Available Quantity" type="number" required />
                <input className="input input-bordered w-full" name="minQty" placeholder="Minimum Order Qty" type="number" required />

                <textarea className="textarea textarea-bordered w-full" name="description" placeholder="Description" required />

                <select name="paymentOption" className="select select-bordered w-full">
                    <option value="online">Online Payment</option>
                    <option value="cod">Cash On Delivery</option>
                </select>

                <button className="btn btn-primary w-full">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
