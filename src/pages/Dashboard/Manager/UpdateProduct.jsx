import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const PAYMENT_OPTIONS = ['Full Advance', '50% Advance', 'COD'];
const CATEGORIES = ['T-Shirt', 'Jeans', 'Jacket', 'Hoodie'];

const UpdateProduct = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [productData, setProductData] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        },
        enabled: !!id,
        retry: 1,
    });

    useEffect(() => {
        if (product) {
            setProductData(product);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productData) return;

        setIsUpdating(true);
        try {
            const res = await axiosSecure.patch(`/get-products/${id}`, productData);

            if (res.data.modifiedCount) {
                toast.success("Product updated successfully!");
                queryClient.invalidateQueries(["manager-products"]);
                queryClient.invalidateQueries(["product-details", id]);
                navigate('/dashboard/manage-products');
            } else if (res.data.message === "No changes detected.") {
                toast.info("No changes were made to the product.");
            } else {
                toast.error("Failed to update product!");
            }
        } catch (err) {
            console.error("Update Error:", err);
            toast.error(err.response?.data?.message || "Failed to update product.");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) return <p className="py-8 text-center">Loading product data...</p>;
    if (isError || !product) return <p className="py-8 text-center text-red-600">Error loading product or product not found.</p>;
    if (!productData) return <p className="py-8 text-center">Preparing form...</p>;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-indigo-700">Update Product: {productData.name}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Product Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name || ''}
                        onChange={handleChange}
                        placeholder="e.g., Slim Fit Denim Jeans"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Price (USD)</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price || ''}
                        onChange={handleChange}
                        placeholder="99.99"
                        className="input input-bordered w-full"
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Description</span>
                    </label>
                    <textarea
                        name="description"
                        value={productData.description || ''}
                        onChange={handleChange}
                        placeholder="Detailed product description..."
                        className="textarea textarea-bordered h-32 w-full"
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Category</span>
                    </label>
                    <select
                        name="category"
                        value={productData.category || ''}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Payment Option</span>
                    </label>
                    <select
                        name="paymentOption"
                        value={productData.paymentOption || ''}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        {PAYMENT_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer justify-start space-x-3">
                        <input
                            type="checkbox"
                            name="showOnHome"
                            checked={productData.showOnHome || false}
                            onChange={handleChange}
                            className="checkbox checkbox-primary"
                        />
                        <span className="label-text font-semibold">Show product on Homepage?</span>
                    </label>
                </div>

                
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Image URL (First Image)</span>
                    </label>
                    <input
                        type="url"
                        name="images[0]"
                        value={productData.images?.[0] || ''}
                        onChange={(e) => {
                            const newImages = [...(productData.images || [])];
                            newImages[0] = e.target.value;
                            setProductData(prev => ({ ...prev, images: newImages }));
                        }}
                        placeholder="Image URL"
                        className="input input-bordered w-full"
                    />
                    {productData.images?.[0] && (
                        <div className="mt-4">
                            <img src={productData.images[0]} alt="Current Product" className="w-32 h-32 object-cover rounded shadow" />
                        </div>
                    )}
                </div>


                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
                    <button type="submit" className="btn btn-primary text-white" disabled={isUpdating}>
                        {isUpdating ? 'Updating...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;