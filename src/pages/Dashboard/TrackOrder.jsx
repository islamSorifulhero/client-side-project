import React, { useState } from "react";
import { useNavigate } from "react-router";

const TrackOrder = () => {
    const [id, setId] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if(id.trim()) {
            navigate(`/dashboard/track-order/${id.trim()}`);
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-extrabold text-center mb-6 text-gray-800">Track Your Package</h2>
                <form onSubmit={handleSearch} className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-2">Enter Booking ID</label>
                        <input 
                            type="text" 
                            className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g. 64b8f..." 
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full rounded-xl shadow-lg">
                        Track Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TrackOrder;