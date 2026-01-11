import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const DashboardHome = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://server-side-one-eta.vercel.app/products")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setBookings(data);
                } else if (data && Array.isArray(data.data)) {
                    setBookings(data.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch bookings error:", err);
                setLoading(false);
            });
    }, []);

    const safeBookings = Array.isArray(bookings) ? bookings : [];

    const total = safeBookings.length;
    const pending = safeBookings.filter((b) => b.status === "pending").length;
    const approved = safeBookings.filter(
        (b) => b.status === "approved" || b.status === "paid"
    ).length;
    const rejected = safeBookings.filter((b) => b.status === "rejected").length;

    if (loading) {
        return <div className="p-10 text-center font-black"><span className="loading loading-bars loading-xl"></span></div>;
    }

    return (
        <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-lg border-b-4 border-blue-500">
                    <h4 className="text-xs font-black uppercase text-gray-400">Total Bookings</h4>
                    <p className="text-3xl font-black">{total}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-lg border-b-4 border-yellow-500">
                    <h4 className="text-xs font-black uppercase text-gray-400">Pending</h4>
                    <p className="text-3xl font-black">{pending}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-lg border-b-4 border-emerald-500">
                    <h4 className="text-xs font-black uppercase text-gray-400">Approved</h4>
                    <p className="text-3xl font-black">{approved}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-lg border-b-4 border-red-500">
                    <h4 className="text-xs font-black uppercase text-gray-400">Rejected</h4>
                    <p className="text-3xl font-black">{rejected}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Bar Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] shadow-xl">
                    <Bar
                        data={{
                            labels: ["Total", "Pending", "Approved", "Rejected"],
                            datasets: [
                                {
                                    label: "Bookings",
                                    data: [total, pending, approved, rejected],
                                    backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"],
                                    borderRadius: 8
                                },
                            ],
                        }}
                    />
                </div>

                {/* Pie Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] shadow-xl flex flex-col items-center">
                    <h4 className="font-black uppercase text-sm mb-4">Status Distribution</h4>
                    <div className="h-64">
                        <Pie
                            data={{
                                labels: ["Pending", "Approved", "Rejected"],
                                datasets: [
                                    {
                                        data: [pending, approved, rejected],
                                        backgroundColor: ["#f59e0b", "#10b981", "#ef4444"],
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Latest Bookings Table */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl overflow-hidden">
                <h4 className="mb-6 font-black uppercase tracking-tighter text-xl">Recent <span className="text-primary">Orders</span></h4>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="uppercase text-[10px] tracking-widest text-gray-400 border-b border-gray-100 dark:border-gray-700">
                                <th className="py-4">Name</th>
                                <th>Price</th>
                                <th>PaymentOption</th>
                                <th>MinimumOrder</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-bold">
                            {safeBookings.slice(0, 10).map((b) => (
                                <tr key={b._id} className="border-b border-gray-50 dark:border-gray-700/50">
                                    <td className="py-4 italic">{b.name || "N/A"}</td>
                                    <td className="text-gray-500">{b.price}</td>
                                    <td>
                                        <span className={`badge badge-sm font-black uppercase ${b.paymentOption === 'approved' ? 'badge-success' : 'badge-warning'}`}>
                                            {b.paymentOption || "pending"}
                                        </span>
                                    </td>
                                    <td>{b.minimumOrder || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;