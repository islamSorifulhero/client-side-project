// import React from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const OrderDetail = () => {
//     const { id } = useParams();
//     const axiosSecure = useAxiosSecure();

//     const { data: order, isLoading, error } = useQuery({
//         queryKey: ["order-details", id],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/get-booking/${id}`);
//             return res.data;
//         },
//     });

//     if (isLoading) return <p className="text-center py-10">Loading...</p>;

//     if (error || !order) {
//         return (
//             <div className="text-center py-10 text-red-600">
//                 You Are Forbidden to Access This Page
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             <h2 className="text-3xl font-bold mb-4">Order Details</h2>

//             <div className="border rounded-lg p-4 mb-6">
//                 <p><strong>Order ID:</strong> {order._id}</p>
//                 <p><strong>Product:</strong> {order.productTitle}</p>
//                 <p><strong>Quantity:</strong> {order.orderQty}</p>
//                 <p><strong>Status:</strong> {order.status}</p>
//                 <p><strong>Tracking ID:</strong> {order.trackingId}</p>
//             </div>

//             <h3 className="text-xl font-semibold mb-3">Tracking Timeline</h3>

//             <ul className="timeline timeline-vertical">
//                 {order.tracking?.map((t, index) => (
//                     <li key={index}>
//                         <div className="timeline-start">{new Date(t.createdAt).toLocaleString()}</div>
//                         <div className="timeline-middle">●</div>
//                         <div className="timeline-end capitalize">
//                             {t.status.replaceAll("_", " ")}
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default OrderDetail;
