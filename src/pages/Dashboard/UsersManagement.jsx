// src/pages/Dashboard/UsersManagement.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    });

    const handleRoleUpdate = async (userId, role) => {
        try {
            await axiosSecure.patch(`/users/${userId}`, { role });
            toast.success("User role updated");
            refetch();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update role");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, i) => (
                        <tr key={u._id}>
                            <th>{i + 1}</th>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                <button onClick={() => handleRoleUpdate(u._id, "manager")} className="btn btn-sm btn-info mr-2">Manager</button>
                                <button onClick={() => handleRoleUpdate(u._id, "buyer")} className="btn btn-sm btn-primary">Buyer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersManagement;
