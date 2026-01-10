import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

import shopImg from "../../../assets/shop-img.jpg";
import Electronic from "../../../assets/Electronic-Devices.png";
import Fashion from "../../../assets/Fashion.jpg";
import HomeAppliances from "../../../assets/Home-img.jpg";
import garments from "../../../assets/garments.mp4";

const categories = [
    { name: "Groceries", img: shopImg, count: "250+ Items" },
    { name: "Electronics", img: Electronic, count: "150+ Items" },
    { name: "Fashion", img: Fashion, count: "320+ Items" },
    { name: "Home Appliances", img: HomeAppliances, count: "490+ Items" },
];

const ProductCategories = () => {
    return (
        <section className="bg-base-100 transition-colors duration-300">

            {/* VIDEO BANNER */}
            <div className="w-full overflow-hidden shadow-lg">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={garments}
                    className="w-full h-[50vh] object-cover"
                />
            </div>

            {/* CATEGORY SECTION */}
            <div className="max-w-7xl mx-auto px-6 py-20">

                {/* HEADER */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black uppercase tracking-tight text-base-content"
                    >
                        Shop By <span className="text-primary">Category</span>
                    </motion.h2>

                    <div className="w-24 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>

                    <p className="mt-4 text-base-content/70 font-bold uppercase text-sm tracking-widest">
                        Crafting Excellence Since 2026
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {categories.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group bg-base-200 rounded-[2rem] overflow-hidden shadow-xl border border-base-300 transition-all duration-300"
                        >
                            {/* IMAGE */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={c.img}
                                    alt={c.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>

                            {/* CONTENT */}
                            <div className="p-8 text-center">
                                <h3 className="text-2xl font-black uppercase tracking-wide text-base-content group-hover:text-primary transition-colors">
                                    {c.name}
                                </h3>

                                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-base-content/60">
                                    {c.count}
                                </p>

                                <Link
                                    to="/all-products"
                                    className="mt-6 inline-block text-xs font-black uppercase tracking-widest text-primary border-b-2 border-primary hover:text-secondary hover:border-secondary transition-all"
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
