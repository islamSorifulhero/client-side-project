import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";

const GetAllProducts = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();



    const { data: products = [], isLoading } = useQuery({
        queryKey: ["all-products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/get-products");
            return res.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/products/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["all-products"]);
            Swal.fire("Delete successful!", "The product has been deleted successfully!", "success");
        },
        onError: () => {
            Swal.fire("Delete failed!", "Failed to delete product।", "error");
        }
    });

    const toggleHomeMutation = useMutation({
        mutationFn: ({ id, showOnHome }) => axiosSecure.patch(`/products/${id}/toggle-home`, { showOnHome }),
        onSuccess: () => {
            queryClient.invalidateQueries(["all-products"]);
            Swal.fire("status updated!", "Home page status updated successfully.", "success");
        },
        onError: () => {
            Swal.fire("Update failed!", "Failed to update status।", "error");
        }
    });

    const handleEdit = (id) => {
        navigate(`/dashboard/edit-product/${id}`);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This product will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    const handleToggleHome = (product) => {
        toggleHomeMutation.mutate({
            id: product._id,
            showOnHome: !product.showOnHome
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40 w-full my-10">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">All Products ({products.length})</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Created By</th>
                            <th>Show on Home</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                            <tr key={p._id}>
                                <th>{i + 1}</th>
                                <td><img src={p.images?.[0] || ""} alt="" className="w-16 h-16 object-cover rounded" /></td>
                                <td>{p.name}</td>
                                <td>${p.price}</td>
                                <td>{p.category}</td>
                                <td>{p.createdBy || "—"}</td>

                                <td>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-sm toggle-success"
                                        checked={p.showOnHome}
                                        onChange={() => handleToggleHome(p)}
                                    />
                                </td>

                                <td className="flex gap-2 items-center h-full pt-6">
                                    <button
                                        className="btn btn-sm btn-info text-white"
                                        onClick={() => handleEdit(p._id)}
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="btn btn-sm btn-error text-white"
                                        onClick={() => handleDelete(p._id)}
                                        disabled={deleteMutation.isLoading}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GetAllProducts;