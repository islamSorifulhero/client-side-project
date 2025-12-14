// // src/pages/Dashboard/Admin/UsersManagement.jsx
// import React, { useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { toast } from "react-toastify";

// const UsersManagement = () => {
//     const axiosSecure = useAxiosSecure();
//     const queryClient = useQueryClient();
//     const [search, setSearch] = useState("");

//     const { data: users = [], isLoading } = useQuery({
//         queryKey: ["users-management"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/users");
//             return res.data;
//         },
//     });

//     const handleRoleChange = async (userId, role) => {
//         try {
//             const res = await axiosSecure.patch(`/users/${userId}/role`, { role });
//             if (res.data.modifiedCount) {
//                 toast.success("User role updated!");
//                 queryClient.invalidateQueries(["users-management"]);
//             }
//         } catch (err) {
//             console.error(err);
//             toast.error("Failed to update role!");
//         }
//     };

//     const handleSuspend = async (userId) => {
//         const reason = prompt("Enter suspend reason/feedback:");
//         if (!reason) return;
//         try {
//             const res = await axiosSecure.patch(`/users/${userId}/suspend`, { reason });
//             if (res.data.modifiedCount) {
//                 toast.success("User suspended!");
//                 queryClient.invalidateQueries(["users-management"]);
//             }
//         } catch (err) {
//             console.error(err);
//             toast.error("Failed to suspend user!");
//         }
//     };

//     if (isLoading) return <p className="py-8 text-center">Loading...</p>;

//     const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

//     return (
//         <div className="max-w-7xl mx-auto p-6">
//             <h2 className="text-2xl font-bold mb-4">Manage Users ({filteredUsers.length})</h2>

//             <input
//                 type="text"
//                 placeholder="Search by name or email"
//                 className="input input-bordered w-full mb-4"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//             />

//             <div className="overflow-x-auto">
//                 <table className="table w-full">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredUsers.map((u, i) => (
//                             <tr key={u._id}>
//                                 <th>{i + 1}</th>
//                                 <td>{u.name}</td>
//                                 <td>{u.email}</td>
//                                 <td>{u.role}</td>
//                                 <td>{u.status}</td>
//                                 <td className="flex gap-2">
//                                     <select onChange={(e) => handleRoleChange(u._id, e.target.value)} className="select select-bordered select-sm">
//                                         <option disabled selected>Change Role</option>
//                                         <option value="buyer">Buyer</option>
//                                         <option value="manager">Manager</option>
//                                         <option value="admin">Admin</option>
//                                     </select>
//                                     <button onClick={() => handleSuspend(u._id)} className="btn btn-sm btn-error">Suspend</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UsersManagement;
