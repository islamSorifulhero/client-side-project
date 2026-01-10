import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaGlobe, FaTshirt, FaStar } from "react-icons/fa";

const stats = [
    {
        id: 1,
        label: "Happy Clients",
        value: "10K+",
        icon: <FaUsers className="text-3xl" />,
        description: "Trusted by customers worldwide",
    },
    {
        id: 2,
        label: "Global Stores",
        value: "45+",
        icon: <FaGlobe className="text-3xl" />,
        description: "Operating across 12 countries",
    },
    {
        id: 3,
        label: "Designs Created",
        value: "1200+",
        icon: <FaTshirt className="text-3xl" />,
        description: "Fresh designs every season",
    },
    {
        id: 4,
        label: "Positive Reviews",
        value: "98%+",
        icon: <FaStar className="text-3xl" />,
        description: "High customer satisfaction rate",
    },
];

const StatsSection = () => {
    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-base-content">
                        Our Growth in Numbers
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-base-content/70">
                        These numbers reflect our commitment to quality, customer
                        satisfaction, and continuous innovation in fashion.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 120,
                            }}
                            className="
                group relative p-8 rounded-2xl text-center
                bg-base-200 shadow hover:shadow-lg
                transition-all duration-300
              "
                        >
                            {/* Icon */}
                            <div
                                className="
                  mb-6 inline-flex items-center justify-center
                  w-20 h-20 rounded-full
                  bg-primary/10 text-primary
                  group-hover:bg-primary group-hover:text-primary-content
                  transition-all duration-500
                "
                            >
                                {stat.icon}
                            </div>

                            {/* Value */}
                            <h3 className="text-4xl font-extrabold text-base-content mb-2">
                                {stat.value}
                            </h3>

                            {/* Label */}
                            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
                                {stat.label}
                            </p>

                            {/* Description */}
                            <p className="text-sm text-base-content/70 font-medium">
                                {stat.description}
                            </p>

                            {/* Decorative Line */}
                            <div
                                className="
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  w-0 h-1.5 bg-primary rounded-full
                  group-hover:w-1/3 transition-all duration-500
                "
                            ></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
