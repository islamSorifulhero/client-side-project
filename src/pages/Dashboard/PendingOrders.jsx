// // src/pages/Dashboard/PendingOrders.jsx
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { toast } from "react-toastify";

// const PendingOrders = () => {
//     const axiosSecure = useAxiosSecure();
//     const { data: orders = [], refetch } = useQuery({
//         queryKey: ["pending-orders"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/bookings?status=Pending");
//             return res.data;
//         }
//     });

//     const handleApprove = async (id) => {
//         try {
//             await axiosSecure.patch(`/bookings/${id}`, { status: "Approved", approvedAt: new Date() });
//             toast.success("Order approved!");
//             refetch();
//         } catch (err) {
//             console.error(err);
//             toast.error("Failed to approve order.");
//         }
//     };

//     const handleReject = async (id) => {
//         try {
//             await axiosSecure.patch(`/bookings/${id}`, { status: "Rejected" });
//             toast.success("Order rejected!");
//             refetch();
//         } catch (err) {
//             console.error(err);
//             toast.error("Failed to reject order.");
//         }
//     };

//     return (
//         <div className="max-w-7xl mx-auto p-6">
//             <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>
//             <div className="overflow-x-auto">
//                 <table className="table w-full">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>User</th>
//                             <th>Product</th>
//                             <th>Qty</th>
//                             <th>Order Date</th>
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
//                                 <td>{new Date(o.createdAt).toLocaleString()}</td>
//                                 <td>
//                                     <button onClick={() => handleApprove(o._id)} className="btn btn-sm btn-success mr-2">Approve</button>
//                                     <button onClick={() => handleReject(o._id)} className="btn btn-sm btn-error">Reject</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PendingOrders;
