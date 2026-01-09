import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import shopImg from "../../../assets/shop-img.jpg"
import Electronic from "../../../assets/Electronic-Devices.png";
import Fashion from "../../../assets/Fashion.jpg";
import HomeAppliances from "../../../assets/Home appliances.jpg";
import garments from "../../../assets/garments.mp4";

const categories = [
    { name: "shop", img: shopImg, count: "250+ Items" },
    { name: "Electronics", img: Electronic, count: "150+ Items" },
    { name: "Fashion", img: Fashion, count: "320+ Items" },
    { name: "Home Appliances", img: HomeAppliances, count: "90+ Items" },
];

const ProductCategories = () => {
    return (
        <section className="bg-white dark:bg-[#0f172a] transition-colors duration-300">
            {/* VIDEO SECTION - FULL NATURAL LOOK */}
            <div className="w-full h-auto overflow-hidden shadow-lg">
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    src={garments} 
                    className="w-full h-full object-cover"
                ></video>
            </div>

            {/* CATEGORIES SECTION */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter"
                    >
                        Shop By <span className="text-primary">Category</span>
                    </motion.h2>
                    <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 font-bold uppercase text-sm tracking-widest">
                        Crafting Excellence Since 2026
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {categories.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -12 }}
                            className="group bg-gray-50 dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
                        >
                            {/* Card Image */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={c.img}
                                    alt={c.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Subtle Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Card Body */}
                            <div className="p-8 text-center">
                                <h3 className="text-2xl font-black text-gray-800 dark:text-white uppercase tracking-wide group-hover:text-primary transition-colors">
                                    {c.name}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 font-bold mt-2 text-sm tracking-wider uppercase">
                                    {c.count}
                                </p>

                                <Link
                                    to="/all-products"
                                    className="mt-6 inline-block text-xs font-black text-primary border-b-2 border-primary hover:text-secondary hover:border-secondary transition-all uppercase tracking-widest"
                                >
                                    Explore More
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductCategories;