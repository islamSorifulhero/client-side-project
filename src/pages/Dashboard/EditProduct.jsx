import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                availableQty: product.availableQty,
                minimumOrder: product.minimumOrder,
            });
        }
    }, [product, reset]);

    const updateMutation = useMutation({
        mutationFn: (updatedData) => axiosSecure.patch(`/get-products/${id}`, updatedData),
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

    const handleImageUpload = async (files) => {
        if (files.length === 0) {
            return product.images || [];
        }
        console.warn("Image upload functionality needs to be implemented here.");

        return product.images || [];
    };
    const onSubmit = async (data) => {
        if (updateMutation.isLoading) return;

        try {
            const images = await handleImageUpload(data.images);

            const updatedProduct = {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                category: data.category,
                availableQty: parseInt(data.availableQty),
                minimumOrder: parseInt(data.minimumOrder),
                images: images,
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        </select>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    />
                    <p className="text-sm text-gray-500 mt-2">Leave blank to keep current images. Upload new files to replace/add.</p>
                </div>

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