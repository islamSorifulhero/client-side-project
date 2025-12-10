import React from "react";
import { motion } from "framer-motion";
import { FaCreditCard, FaShoppingCart } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

const steps = [
    {
        icon: <FaShoppingCart className="text-4xl text-primary" />,
        title: "Browse Products",
        desc: "Search thousands of top-quality items at the best prices."
    },
    {
        icon: <FaCreditCard className="text-4xl text-primary" />,
        title: "Place Your Order",
        desc: "Quick, secure, and smooth checkout experience."
    },
    {
        icon: <FaTruckFast className="text-4xl text-primary" />,
        title: "Fast Delivery",
        desc: "We deliver your product safely to your doorstep."
    }
];

const HowItWorks = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="card shadow-lg p-6 text-center rounded-xl"
                    >
                        <div className="mb-4 flex justify-center">{s.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                        <p className="text-gray-600">{s.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;