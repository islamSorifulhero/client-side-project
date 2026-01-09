import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../../src/hooks/useAxiosPublic";

const FeaturedProducts = () => {
    const axiosPublic = useAxiosPublic();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["featuredProducts"],
        queryFn: async () => {
            const res = await axiosPublic.get("/products?limit=8");
            return res.data;
        },
    });

    // Skeleton Loader Component (Requirement 3 & 9)
    const SkeletonCard = () => (
        <div className="flex flex-col gap-4 w-full h-[420px]">
            <div className="skeleton h-52 w-full rounded-2xl"></div>
            <div className="skeleton h-6 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-10 w-full mt-auto"></div>
        </div>
    );

    return (
        <section className="bg-white dark:bg-[#0f172a] py-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter"
                    >
                        Featured <span className="text-primary">Products</span>
                    </motion.h2>
                    <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {isLoading
                        ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
                        : products.map((p) => (
                            <motion.div
                                key={p._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="group flex flex-col h-[420px] bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300"
                            >
                                {/* Image Holder */}
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={p.images}
                                        alt={p.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-primary">
                                        {p.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-black text-gray-800 dark:text-white uppercase truncate">
                                        {p.name}
                                    </h3>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                                        {p.description || "Premium quality fabric designed for comfort and style."}
                                    </p>
                                    
                                    {/* Meta Info */}
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-2xl font-black text-primary">${p.price}</span>
                                        <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm uppercase">
                                            Stock: {p.availableQty}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-auto pt-4">
                                        <Link
                                            to={`/product/${p._id}`}
                                            className="btn btn-primary btn-sm w-full font-black uppercase rounded-xl tracking-widest shadow-lg shadow-primary/20"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>

                {/* Footer Link */}
                <div className="text-center mt-16">
                    <Link 
                        to="/all-products" 
                        className="inline-block px-10 py-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-black uppercase rounded-full transition-all duration-300 tracking-widest"
                    >
                        View All Collections
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;