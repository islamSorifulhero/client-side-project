import React from "react";
import { FaCheckCircle, FaHeadset, FaMoneyBillWave } from "react-icons/fa";

const features = [
    {
        icon: <FaMoneyBillWave className="text-4xl text-primary" />,
        title: "Best Price Guaranteed",
        desc: "We ensure unbeatable prices for all products."
    },
    {
        icon: <FaCheckCircle className="text-4xl text-primary" />,
        title: "Trusted Quality",
        desc: "Every item is verified and tested before listing."
    },
    {
        icon: <FaHeadset className="text-4xl text-primary" />,
        title: "24/7 Support",
        desc: "Our team is always here to assist you."
    }
];

const WhyChooseUs = () => {
    return (
        <div className="bg-base-200 py-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-10">Why Choose Us?</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="card shadow-lg p-6 rounded-xl text-center">
                            <div className="mb-4 flex justify-center">{f.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                            <p className="text-gray-600">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
