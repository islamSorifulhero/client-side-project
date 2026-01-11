import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Load profile
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosSecure
      .get(`/users/${user.email}`)
      .then((res) => {
        setProfileData(res.data);
        setFormData({
          name: res.data.name || "",
          photoURL: res.data.photoURL || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load profile information");
      })
      .finally(() => setLoading(false));
  }, [user, axiosSecure]);

  // 🔹 Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.patch(`/users/${user.email}`, formData);
      toast.success("Profile updated successfully!");
      setProfileData({ ...profileData, ...formData });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed!");
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Logout failed!");
    }
  };

  // 🔹 Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  if (!profileData) {
    return <p className="text-center py-10">No profile data found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        My Profile
      </h2>

      <div className="bg-base-100 shadow-xl rounded-2xl p-8 border border-base-200">

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={formData.photoURL || user.photoURL || "https://i.ibb.co/7WZRrFZ/user.png"}
            alt="User"
            className="w-32 h-32 rounded-full border-4 border-primary object-cover"
          />
        </div>

        {/* VIEW MODE */}
        {!isEditing && (
          <div className="space-y-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-xl font-semibold">
                {profileData.name || user.displayName || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{profileData.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <span className="px-4 py-1 rounded-full bg-primary text-white text-sm font-semibold">
                {profileData.role}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p>{profileData.phone || "Not provided"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p>{profileData.address || "Not provided"}</p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline btn-primary w-full mt-4"
            >
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="btn btn-error w-full mt-2 text-white"
            >
              Logout
            </button>
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="font-semibold">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Photo URL</label>
              <input
                type="text"
                value={formData.photoURL}
                onChange={(e) =>
                  setFormData({ ...formData, photoURL: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-semibold">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-semibold">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="textarea textarea-bordered w-full"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn btn-primary w-full">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-outline w-full"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
