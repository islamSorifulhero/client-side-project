import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40 w-full my-10">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
                Manage Users ({users.length})
            </h2>

            <div className="overflow-x-auto border rounded-lg">
                <table className="table w-full text-sm sm:text-base">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u, i) => (
                            <tr key={u._id}>
                                <td>{i + 1}</td>

                                <td className="max-w-[150px] truncate">
                                    {u.name || "—"}
                                </td>

                                <td className="max-w-[220px] truncate">
                                    {u.email}
                                </td>

                                <td className="text-center capitalize">
                                    <span className="badge badge-info text-white">
                                        {u.role}
                                    </span>
                                </td>

                                <td>
                                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                        <button
                                            className="btn btn-xs sm:btn-sm"
                                            onClick={() => handleRoleChange(u._id, "manager")}
                                            disabled={u.role === "manager"}
                                        >
                                            Make Manager
                                        </button>

                                        <button
                                            className="btn btn-xs sm:btn-sm btn-error"
                                            onClick={() => handleRoleChange(u._id, "buyer")}
                                            disabled={u.role === "buyer"}
                                        >
                                            Make Buyer
                                        </button>
                                    </div>
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
