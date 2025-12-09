import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handleRoleChange = async (id, role) => {
        await axiosSecure.patch(`/users/role/${id}`, { role });
        refetch();
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>

            <div className="overflow-x-auto">
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
                                <td>{i + 1}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-sm"
                                        onClick={() => handleRoleChange(u._id, "manager")}
                                    >
                                        Make Manager
                                    </button>

                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleRoleChange(u._id, "buyer")}
                                    >
                                        Make Buyer
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

export default ManageUsers;
