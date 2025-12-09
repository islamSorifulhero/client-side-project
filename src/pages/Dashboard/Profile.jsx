// src/pages/Dashboard/Profile.jsx
import React from "react";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
    const { user, logout } = useAuth();

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <div className="space-y-2">
                <p><strong>Name:</strong> {user.displayName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Status:</strong> {user.status}</p>
            </div>
            <button onClick={logout} className="btn btn-error mt-4">Logout</button>
        </div>
    );
};

export default Profile;
