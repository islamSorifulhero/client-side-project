import React from "react";

const Privacy = () => {
    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-4">
                Privacy Policy & Terms
            </h1>

            <p className="leading-7">
                We value your privacy and are committed to protecting your personal
                information. This page explains how we collect, use, and safeguard
                your data.
            </p>

            <div className="border rounded-2xl p-4 shadow space-y-2">
                <h2 className="text-xl font-semibold">Information Collection</h2>
                <p className="text-sm text-gray-600">
                    We collect only necessary information such as name, email,
                    and order details to operate our services.
                </p>
            </div>

            <div className="border rounded-2xl p-4 shadow space-y-2">
                <h2 className="text-xl font-semibold">Data Security</h2>
                <p className="text-sm text-gray-600">
                    All user data is stored securely and protected from unauthorized access.
                </p>
            </div>

            <div className="border rounded-2xl p-4 shadow space-y-2">
                <h2 className="text-xl font-semibold">Terms of Use</h2>
                <p className="text-sm text-gray-600">
                    By using this system, you agree not to misuse the platform
                    or violate any applicable rules.
                </p>
            </div>
        </div>
    );
};

export default Privacy;
