import React from "react";
import { motion } from "framer-motion";

const blogs = [
    {
        id: 1,
        title: "The Art of Sustainable Fashion",
        date: "Jan 05, 2026",
        img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=500",
        category: "Sustainability"
    },
    {
        id: 2,
        title: "Summer 2026 Collection Trends",
        date: "Jan 02, 2026",
        img: "https://i.ibb.co.com/V0brCPpd/Home-img.jpg",
        category: "Trends"
    },
    {
        id: 3,
        title: "How to Choose the Right Fabric",
        date: "Dec 28, 2025",
        img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=500",
        category: "Style Guide"
    }
];

const FashionBlog = () => {
    return (
        <section className="py-20 bg-white dark:bg-[#0f172a] transition-colors duration-300">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="text-left">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter"
                        >
                            Fashion <span className="text-primary">Journal</span>
                        </motion.h2>
                        <p className="mt-2 text-gray-500 font-bold uppercase tracking-widest text-xs">Stay updated with latest trends</p>
                    </div>
                    <button className="btn btn-outline btn-primary rounded-full px-8 font-black uppercase text-xs">View All Posts</button>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-64 overflow-hidden rounded-[2rem] mb-6">
                                <img
                                    src={blog.img}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white text-primary dark:bg-gray-800 px-4 py-1 rounded-full text-[10px] font-black uppercase shadow-lg">
                                    {blog.category}
                                </div>
                            </div>
                            <p className="text-primary font-bold text-xs uppercase mb-2">{blog.date}</p>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase leading-tight group-hover:text-primary transition-colors">
                                {blog.title}
                            </h3>
                            <div className="mt-4 w-10 h-1 bg-gray-200 group-hover:w-20 group-hover:bg-primary transition-all duration-500"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FashionBlog;