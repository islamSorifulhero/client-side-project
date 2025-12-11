// // src/pages/Dashboard/ManageProducts.jsx
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { toast } from "react-toastify";

// const ManageProducts = () => {
//     const axiosSecure = useAxiosSecure();

//     const { data: products = [], refetch, isLoading } = useQuery({
//         queryKey: ["products"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/products");
//             return res.data;
//         }
//     });

//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure to delete this product?")) return;
//         try {
//             await axiosSecure.delete(`/products/${id}`);
//             toast.success("Product deleted!");
//             refetch();        } catch (err) {
//             console.error(err);
//             toast.error("Failed to delete product.");
//         }
//     };

//     if (isLoading) return <p className="py-8 text-center">Loading...</p>;

//     return (
//         <div className="max-w-6xl mx-auto p-6">
//             <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
//             <div className="overflow-x-auto">
//                 <table className="table w-full">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Image</th>
//                             <th>Name</th>
//                             <th>Price</th>
//                             <th>Payment Mode</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map((p, i) => (
//                             <tr key={p._id}>
//                                 <th>{i + 1}</th>
//                                 <td><img src={p.images?.[0] || ""} alt={p.name} className="w-16 h-16 object-cover" /></td>
//                                 <td>{p.name}</td>
//                                 <td>${p.price}</td>
//                                 <td>{p.paymentOption}</td>
//                                 <td>
//                                     <button className="btn btn-sm btn-info mr-2">Edit</button>
//                                     <button className="btn btn-sm btn-error" onClick={() => handleDelete(p._id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManageProducts;
