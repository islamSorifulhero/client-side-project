import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaGlobe, FaTshirt, FaStar } from "react-icons/fa";

const stats = [
    {
        id: 1,
        label: "Happy Clients",
        value: "10K+",
        icon: <FaUsers className="text-4xl" />,
        description: "Trusted by thousands globally"
    },
    {
        id: 2,
        label: "Global Stores",
        value: "45+",
        icon: <FaGlobe className="text-4xl" />,
        description: "Operating in 12 countries"
    },
    {
        id: 3,
        label: "Designs Ready",
        value: "1200+",
        icon: <FaTshirt className="text-4xl" />,
        description: "New designs every week"
    },
    {
        id: 4,
        label: "Positive Reviews",
        value: "99%",
        icon: <FaStar className="text-4xl" />,
        description: "Highest satisfaction rate"
    }
];

const StatsSection = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-[#111827] transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-12">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1,
                                type: "spring", 
                                stiffness: 100 
                            }}
                            className="relative group p-8 bg-white dark:bg-gray-800 rounded-[2rem] shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 text-center transition-all duration-300"
                        >
                            {/* Icon with Animated Background */}
                            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                {stat.icon}
                            </div>

                            {/* Value & Label */}
                            <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-lg font-bold text-primary uppercase tracking-widest mb-3">
                                {stat.label}
                            </p>
                            
                            {/* Description */}
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {stat.description}
                            </p>

                            {/* Bottom Decorative Line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-primary rounded-full group-hover:w-1/3 transition-all duration-500"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;