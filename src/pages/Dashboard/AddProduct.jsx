import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";


const ImgBB_API = import.meta.env.VITE_image_host_key;

const AddProduct = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const uploadImagesToImgBB = async (files) => {
        const imageURLs = [];
        if (!files || files.length === 0) return imageURLs;

        const MAX_FILE_SIZE = 10 * 1024 * 1024;

        for (const file of files) {

            if (file.size > MAX_FILE_SIZE) {
                toast.error(`File "${file.name}" exceeds the 10MB limit.`);
                continue;
            }

            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`, {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();

                if (data.success && data.data.url) {
                    imageURLs.push(data.data.url);
                } else {
                    console.error("ImgBB upload failed for a file:", data);
                    toast.error(`Image upload failed for file: ${file.name}`);
                }
            } catch (error) {
                console.error("Error during image upload:", error);
                toast.error(`Error uploading file: ${file.name}`);
            }
        }
        return imageURLs;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);


        const form = e.target;
        const formData = new FormData(form);
        const imageFiles = formData.getAll("images");

        if (imageFiles.length === 0 || (imageFiles.length === 1 && imageFiles[0].size === 0)) {
            toast.error("Please select at least one image file.");
            setLoading(false);
            return;
        }

        const uploadedImageURLs = await uploadImagesToImgBB(imageFiles);

        if (imageFiles.length > 0 && uploadedImageURLs.length !== imageFiles.length) {
            setLoading(false);
            return toast.error("Some images failed to upload. Product not added.");
        }


        const productData = {
            name: formData.get("name"),
            description: formData.get("description"),
            category: formData.get("category"),
            price: parseFloat(formData.get("price")),
            availableQty: parseInt(formData.get("availableQty")),
            minimumOrder: parseInt(formData.get("minimumOrder")),
            paymentOption: formData.get("paymentOption"),
            images: uploadedImageURLs,
            demoVideo: formData.get("demoVideo"),
            showOnHome: formData.get("showOnHome") === "on"
        };
        try {
            const { data } = await axiosSecure.post("/products", productData);
            if (data.insertedId) toast.success("Product added successfully!");
            form.reset()
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
