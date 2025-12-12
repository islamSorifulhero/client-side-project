// src/pages/Dashboard/Profile.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Profile = () => {
    const { user, logOut } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);
        axiosSecure
            .get(`/users/${user.email}`)
            .then((res) => {
                setProfileData(res.data);
            })
            .catch((err) => {
                console.error("Profile load error:", err);
                toast.error("Failed to load profile info.");
            })
            .finally(() => setLoading(false));
    }, [user, axiosSecure]);

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success("Logged out successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Logout failed.");
        }
    };

    if (loading) return <p className="text-center py-8">Loading profile...</p>;
    if (!profileData) return <p className="text-center py-8">No profile data found.</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">

            {/* Header */}
            <h2 className="text-3xl font-bold mb-8 text-center">My Profile</h2>

            {/* Profile Card */}
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

                {/* User Image */}
                <div className="flex justify-center mb-6">
                    <div className="relative group">
                        <img
                            src={user.photoURL || "https://i.ibb.co/7WZRrFZ/user.png"}
                            alt="User"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* glowing ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 opacity-30 -z-10 blur-xl"></div>
                    </div>
                </div>

                {/* User Info */}
                <div className="space-y-4 text-center">

                    <div>
                        <p className="text-gray-500 text-sm">Name</p>
                        <p className="text-xl font-semibold">
                            {profileData.name || user.displayName || "N/A"}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Email</p>
                        <p className="text-lg font-medium">{profileData.email || user.email}</p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Role</p>
                        <span className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium">
                            {profileData.role}
                        </span>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Status</p>
                        <span
                            className={`px-4 py-1 rounded-full font-medium 
                                ${profileData.status === "active"
                                    ? "bg-green-500 text-white"
                                    : profileData.status === "suspended"
                                        ? "bg-red-500 text-white"
                                        : "bg-yellow-500 text-white"
                                }`}
                        >
                            {profileData.status}
                        </span>
                    </div>

                    {/* Suspend Feedback */}
                    {profileData.suspendFeedback && (
                        <div>
                            <p className="text-red-600 font-semibold">Suspend Feedback</p>
                            <p className="text-red-500 text-sm">
                                {profileData.suspendFeedback}
                            </p>
                        </div>
                    )}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl shadow hover:opacity-90 transition"
                    >
                        Logout
                    </button>

                </div>
            </div>

        </div>
    );
};

export default Profile;
