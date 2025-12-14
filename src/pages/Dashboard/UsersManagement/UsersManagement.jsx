import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-users/all?search=${searchText}`);
            return res.data;
        }
    });

    const updateUser = (userId, updateInfo) => {
        axiosSecure.patch(`/users/update/${userId}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User status updated!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    Swal.fire('Failed!', 'No changes were made or user not found.', 'error');
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire('Error', 'Failed to update user due to a server error.', 'error');
            });
    };

    const handleUpdateRole = (user, newRole) => {
        Swal.fire({
            title: `Change role to ${newRole.toUpperCase()}?`,
            text: `Are you sure you want to change ${user.displayName}'s role to ${newRole}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: `Yes, Make ${newRole.toUpperCase()}`
        }).then((result) => {
            if (result.isConfirmed) {
                updateUser(user._id, { role: newRole });
            }
        });
    };

    const handleSuspendUser = (user) => {
        Swal.fire({
            title: `Suspend ${user.displayName}?`,
            input: 'text',
            inputPlaceholder: 'Enter suspension reason (Required)',
            showCancelButton: true,
            confirmButtonText: 'Suspend User',
            inputValidator: (value) => {
                if (!value) return 'You need to write a reason to suspend!';
            }
        }).then((result) => {
            if (result.isConfirmed) {
                updateUser(user._id, { suspendReason: result.value });
            }
        });
    };

    const handleUnsuspendUser = (user) => {
        Swal.fire({
            title: `Unsuspend ${user.displayName}?`,
            text: "This will restore the user's access.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Unsuspend!"
        }).then((result) => {
            if (result.isConfirmed) {
                updateUser(user._id, { suspendReason: '' });
            }
        });
    };

    return (
        <div className='p-6'>
            <h2 className='text-3xl font-bold mb-4'>Manage Users: {users.length}</h2>

            <div className="mb-4">
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="search"
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Search users by email" />
            </div>

            <div className="overflow-x-auto border rounded-lg shadow">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User (Name)</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className='text-center'>Admin Action (Role Change)</th>
                            <th className='text-center'>Others Actions (Suspend)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL || 'placeholder_image_url'} 
                                                    alt="User Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName || 'N/A'}</div>
                                            <div className={`badge badge-sm ${user.status === 'suspended' ? 'badge-error' : 'badge-success'}`}>
                                                {user.status || 'approved'}
                                            </div>
                                            {user.suspendReason && <div className="text-xs text-red-500 italic mt-1">Reason: {user.suspendReason}</div>}
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`font-bold ${user.role === 'admin' ? 'text-red-500' : user.role === 'manager' ? 'text-blue-500' : 'text-green-500'}`}>
                                        {user.role}
                                    </span>
                                </td>

                                <td className='text-center'>
                                    {user.role === 'admin' ? (
                                        <span className='font-bold text-red-600'>Cannot change Admin</span>
                                    ) : user.role === 'manager' ? (
                                        <button
                                            onClick={() => handleUpdateRole(user, 'buyer')}
                                            className='btn btn-sm btn-warning'
                                        >
                                            Make Buyer
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleUpdateRole(user, 'manager')}
                                            className='btn btn-sm btn-success'
                                        >
                                            Make Manager
                                        </button>
                                    )}
                                </td>

                                <th className='text-center'>
                                    {user.role !== 'admin' && ( 
                                        user.status === 'suspended' ? (
                                            <button
                                                onClick={() => handleUnsuspendUser(user)}
                                                className='btn btn-sm bg-green-500 text-white hover:bg-green-600'
                                            >
                                                Unsuspend
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleSuspendUser(user)}
                                                className='btn btn-sm bg-red-500 text-white hover:bg-red-600'
                                            >
                                                Suspend
                                            </button>
                                        )
                                    )}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;