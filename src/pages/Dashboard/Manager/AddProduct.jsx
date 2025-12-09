// src/pages/Dashboard/Manager/AddProduct.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddProduct = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, watch, reset } = useForm();
    const [previewImages, setPreviewImages] = useState([]);

    const onSubmit = async (data) => {
        try {
            // Convert images to URLs (simulate upload)
            const images = Array.from(data.images).map((file) => URL.createObjectURL(file));

            const productData = {
                name: data.name,
                description: data.description,
                category: data.category,
                price: parseFloat(data.price),
                availableQty: parseInt(data.availableQty),
                minimumOrder: parseInt(data.minimumOrder),
                images,
                demoVideo: data.demoVideo || "",
                paymentOption: data.paymentOption,
                showOnHome: data.showOnHome || false,
            };

            const res = await axiosSecure.post("/products", productData);

            if (res.data.insertedId) {
                toast.success("Product added successfully!");
                reset();
                setPreviewImages([]);
            } else {
                toast.error("Failed to add product.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error adding product!");
        }
    };

    const handleImagePreview = (e) => {
        const files = Array.from(e.target.files);
        setPreviewImages(files.map((f) => URL.createObjectURL(f)));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
                <div>
                    <label className="font-semibold">Product Name</label>
                    <input {...register("name", { required: true })} className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Description</label>
                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Category</label>
                    <select {...register("category", { required: true })} className="select select-bordered w-full">
                        <option value="">Select Category</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Pant">Pant</option>
                        <option value="Jacket">Jacket</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>

                <div>
                    <label className="font-semibold">Price</label>
                    <input type="number" {...register("price", { required: true, min: 0 })} className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Available Quantity</label>
                    <input type="number" {...register("availableQty", { required: true, min: 0 })} className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Minimum Order Quantity</label>
                    <input type="number" {...register("minimumOrder", { required: true, min: 1 })} className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Product Images</label>
                    <input type="file" multiple accept="image/*" {...register("images", { required: true })} onChange={handleImagePreview} className="input input-bordered w-full" />
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {previewImages.map((img, idx) => (
                            <img key={idx} src={img} alt="" className="w-24 h-24 object-cover rounded border" />
                        ))}
                    </div>
                </div>

                <div>
                    <label className="font-semibold">Demo Video Link (Optional)</label>
                    <input type="text" {...register("demoVideo")} className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Payment Option</label>
                    <select {...register("paymentOption", { required: true })} className="select select-bordered w-full">
                        <option value="">Select Payment Option</option>
                        <option value="COD">Cash on Delivery</option>
                        <option value="online">PayFirst / Online</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" {...register("showOnHome")} />
                    <span>Show on Home Page</span>
                </div>

                <button className="btn btn-primary w-full mt-3">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
