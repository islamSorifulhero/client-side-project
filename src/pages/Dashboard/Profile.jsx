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
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>

            <div className="bg-white p-6 rounded-lg shadow space-y-4">
                <div>
                    <label className="font-semibold">Name:</label>
                    <p>{profileData.name || user.displayName || "N/A"}</p>
                </div>

                <div>
                    <label className="font-semibold">Email:</label>
                    <p>{profileData.email || user.email}</p>
                </div>

                <div>
                    <label className="font-semibold">Role:</label>
                    <p>{profileData.role}</p>
                </div>

                <div>
                    <label className="font-semibold">Status:</label>
                    <p>{profileData.status}</p>
                </div>

                {profileData.suspendFeedback && (
                    <div>
                        <label className="font-semibold text-red-600">Suspend Feedback:</label>
                        <p className="text-red-500">{profileData.suspendFeedback}</p>
                    </div>
                )}

                <button onClick={handleLogout} className="btn btn-primary mt-4">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
