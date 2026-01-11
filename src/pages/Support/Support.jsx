import React from "react";

const Support = () => {
    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-4">Help & Support</h1>

            <p className="leading-7">
                Need help using our Garments Order & Production Tracker System?
                Find answers to common questions below.
            </p>

            <div className="space-y-4">
                <div className="border rounded-2xl p-4 shadow">
                    <h2 className="font-semibold text-lg">
                        How do I place an order?
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Browse products, view details, and click the booking button.
                        Fill in the order form and submit.
                    </p>
                </div>

                <div className="border rounded-2xl p-4 shadow">
                    <h2 className="font-semibold text-lg">
                        How can I track my order?
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Go to Dashboard → Track Order to see the real-time status.
                    </p>
                </div>

                <div className="border rounded-2xl p-4 shadow">
                    <h2 className="font-semibold text-lg">
                        Who can approve orders?
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Only Managers and Admins can approve or reject orders.
                    </p>
                </div>
            </div>

            <div className="border rounded-2xl p-4 shadow">
                <h2 className="font-semibold text-lg mb-2">
                    Still need help?
                </h2>
                <p className="text-sm">
                    Contact our support team via email:
                    <span className="font-semibold"> support@garmtracker.com</span>
                </p>
            </div>
        </div>
    );
};

export default Support;
