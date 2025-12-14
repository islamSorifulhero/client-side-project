// src/pages/Dashboard/EditProduct.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router';

const EditProduct = () => {
    const { id } = useParams(); // URL থেকে প্রোডাক্ট ID নেওয়া
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // 1. প্রোডাক্টের বর্তমান ডেটা ফেচ করা
    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        },
        enabled: !!id, // ID থাকলেই ফেচ করবে
        staleTime: 1000 * 60 * 5, // 5 মিনিট পর্যন্ত ডেটা পুরনো না হলে রি-ফেচ করবে না
    });

    // ফর্মের ডিফল্ট ভ্যালু সেট করা
    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                availableQty: product.availableQty,
                minimumOrder: product.minimumOrder,
                // ইমেজ এবং ভিডিওর জন্য আলাদা হ্যান্ডেলিং প্রয়োজন
            });
        }
    }, [product, reset]);

    // 2. প্রোডাক্ট আপডেটের জন্য Mutation
    const updateMutation = useMutation({
        mutationFn: (updatedData) => axiosSecure.patch(`/get-products/${id}`, updatedData), // **Note: সার্ভারে /get-products/:id এডিট রুট ব্যবহার করা হয়েছে**
        onSuccess: () => {
            queryClient.invalidateQueries(["product", id]);
            queryClient.invalidateQueries(["all-products"]);
            toast.success("Product updated successfully!");
            navigate('/dashboard/get-all-products');
        },
        onError: (error) => {
            console.error("Update Error:", error);
            toast.error("❌ Failed to update product: " + (error.response?.data?.message || 'Server error'));
        }
    });

    // 3. ইমেজ আপলোড প্লেসহোল্ডার (আপনার রিয়েল ইমেজ আপলোড লজিক এখানে আসবে)
    const handleImageUpload = async (files) => {
        // *** আপনার ফায়ারবেস/ক্লাউড স্টোরেজ আপলোড লজিক এখানে যোগ করুন ***
        // যেহেতু আপনি সার্ভারে প্রোডাক্ট তৈরি করার জন্য একটি রুট ব্যবহার করেন, 
        // আপনি সেই একই ক্লাউড/ফায়ারবেস আপলোড ফাংশন এখানে ব্যবহার করতে পারেন।

        // ডেমো হিসেবে, এটি বর্তমান ইমেজগুলো ফিরিয়ে দেবে যদি নতুন ফাইল না থাকে:
        if (files.length === 0) {
            return product.images || [];
        }

        // রিয়েল লাইফে এখানে ইমেজ আপলোড হবে এবং URL array রিটার্ন করবে
        // return await uploadImagesToStorage(files); 

        // যেহেতু আপনার রিয়েল আপলোড লজিক এখানে নেই, আমরা আপাতত একটি সতর্কতা দিচ্ছি।
        console.warn("Image upload functionality needs to be implemented here.");

        // শুধু বর্তমান ইমেজগুলি বজায় রাখা
        return product.images || [];
    };

    // 4. ফর্ম সাবমিট হ্যান্ডলার
    const onSubmit = async (data) => {
        if (updateMutation.isLoading) return;

        try {
            // ছবির ক্ষেত্রে, যদি আপনি ফর্মে ইমেজ ইনপুট ফিল্ড ব্যবহার করেন,
            // তাহলে data.images হবে FileList বা Array.
            // এখানে ধরে নেওয়া হচ্ছে আপনি আপাতত images এবং demoVideo আপডেট করছেন না, 
            // বা আপনার আপলোড লজিক data.images হ্যান্ডেল করবে।

            const images = await handleImageUpload(data.images);

            const updatedProduct = {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                category: data.category,
                availableQty: parseInt(data.availableQty),
                minimumOrder: parseInt(data.minimumOrder),
                images: images, // যদি নতুন ইমেজ থাকে তবে নতুন URL, না থাকলে পুরোনোটা
                // demoVideo: data.demoVideo || product.demoVideo, // ভিডিও আপডেটের জন্য লজিক যোগ করুন
                // paymentOptions: product.paymentOptions // যদি প্রয়োজন হয় তবে এটিও যোগ করুন
            };

            updateMutation.mutate(updatedProduct);

        } catch (error) {
            toast.error("Image upload failed or pre-processing error.");
        }
    };

    if (isLoading) return <p className="py-8 text-center text-xl">Loading product data...</p>;
    if (isError || !product) return <p className="py-8 text-center text-red-500">Failed to load product or Product not found.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
                ✏️ Edit Product: {product.name}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Product Name */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Product Name *</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        className="input input-bordered w-full"
                        {...register("name", { required: "Product Name is required" })}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Description *</span>
                    </label>
                    <textarea
                        placeholder="Product Description"
                        className="textarea textarea-bordered w-full"
                        {...register("description", { required: "Description is required" })}
                        rows="4"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                {/* Price & Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Price */}
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Price ($) *</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Price"
                            className="input input-bordered w-full"
                            {...register("price", {
                                required: "Price is required",
                                valueAsNumber: true,
                                min: { value: 0.01, message: "Price must be greater than 0" }
                            })}
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Category *</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            {...register("category", { required: "Category is required" })}
                        >
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="home">Home & Lifestyle</option>
                            <option value="tools">Industrial Tools</option>
                            {/* আরও অপশন যোগ করুন */}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                    </div>
                </div>

                {/* Quantity Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Available Quantity */}
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Available Quantity *</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Available Quantity"
                            className="input input-bordered w-full"
                            {...register("availableQty", {
                                required: "Quantity is required",
                                valueAsNumber: true,
                                min: { value: 0, message: "Quantity cannot be negative" }
                            })}
                        />
                        {errors.availableQty && <p className="text-red-500 text-sm mt-1">{errors.availableQty.message}</p>}
                    </div>

                    {/* Minimum Order */}
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Minimum Order Quantity *</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Minimum Order"
                            className="input input-bordered w-full"
                            {...register("minimumOrder", {
                                required: "Minimum order is required",
                                valueAsNumber: true,
                                min: { value: 1, message: "Minimum order must be at least 1" }
                            })}
                        />
                        {errors.minimumOrder && <p className="text-red-500 text-sm mt-1">{errors.minimumOrder.message}</p>}
                    </div>
                </div>

                {/* Image Section (Current and New Upload) */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Product Images</span>
                    </label>
                    <div className="flex flex-wrap gap-3 mb-3">
                        {product?.images?.map((imgUrl, index) => (
                            <img key={index} src={imgUrl} alt={`Product image ${index + 1}`} className="w-20 h-20 object-cover rounded border" />
                        ))}
                    </div>
                    <input
                        type="file"
                        multiple
                        className="file-input file-input-bordered w-full"
                        {...register("images")}
                    // Note: আপনাকে ফায়ারবেস/ক্লাউড স্টোরেজ আপলোড লজিক `handleImageUpload` এ যোগ করতে হবে।
                    />
                    <p className="text-sm text-gray-500 mt-2">Leave blank to keep current images. Upload new files to replace/add.</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full text-white mt-8"
                    disabled={updateMutation.isLoading}
                >
                    {updateMutation.isLoading ? 'Saving Changes...' : 'Update Product'}
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/dashboard/all-products')}
                    className="btn btn-ghost w-full"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditProduct;