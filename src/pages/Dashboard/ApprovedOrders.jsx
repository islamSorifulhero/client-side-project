// // src/pages/Dashboard/ApprovedOrders.jsx
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { toast } from "react-toastify";

// const ApprovedOrders = () => {
//     const axiosSecure = useAxiosSecure();
//     const { data: orders = [], refetch } = useQuery({
//         queryKey: ["approved-orders"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/bookings?status=Approved");
//             return res.data;
//         }
//     });

//     const handleAddTracking = async (id) => {
//         const note = prompt("Enter tracking note:");
//         if (!note) return;
//         try {
//             await axiosSecure.patch(`/bookings/${id}`, {
//                 trackingHistory: [{ status: "Updated", notes: note, date: new Date() }]
//             });
//             toast.success("Tracking updated!");
//             refetch();
//         } catch (err) {
//             console.error(err);
//             toast.error("Failed to update tracking.");
//         }
//     };

//     return (
//         <div className="max-w-7xl mx-auto p-6">
//             <h2 className="text-2xl font-bold mb-4">Approved Orders</h2>
//             <div className="overflow-x-auto">
//                 <table className="table w-full">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>User</th>
//                             <th>Product</th>
//                             <th>Qty</th>
//                             <th>Approved Date</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orders.map((o, i) => (
//                             <tr key={o._id}>
//                                 <th>{i + 1}</th>
//                                 <td>{o.userEmail}</td>
//                                 <td>{o.productTitle}</td>
//                                 <td>{o.orderQty}</td>
//                                 <td>{new Date(o.approvedAt).toLocaleString()}</td>
//                                 <td>
//                                     <button onClick={() => handleAddTracking(o._id)} className="btn btn-sm btn-primary">Add Tracking</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ApprovedOrders;
