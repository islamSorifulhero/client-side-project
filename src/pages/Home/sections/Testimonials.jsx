import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const reviews = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "Fashion Blogger",
        image: "https://i.pravatar.cc/150?u=alex",
        comment: "The quality of the fabric is exceptional. I've recommended this brand to all my followers!",
        rating: 5
    },
    {
        id: 2,
        name: "Sarah Miller",
        role: "Verified Buyer",
        image: "https://i.pravatar.cc/150?u=sarah",
        comment: "Fast delivery and the fit is perfect. The premium stitching really stands out.",
        rating: 5
    },
    {
        id: 3,
        name: "David Smith",
        role: "Style Enthusiast",
        image: "https://i.pravatar.cc/150?u=david",
        comment: "Affordable luxury at its best. This is my third purchase and I'm impressed every time.",
        rating: 4
    },
    {
        id: 4,
        name: "Emily Davis",
        role: "Regular Customer",
        image: "https://i.pravatar.cc/150?u=emily",
        comment: "Excellent customer service and top-notch packaging. Highly recommended!",
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-base-100 dark:bg-base-200 transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter"
                    >
                        What Our <span className="text-primary">Clients Say</span>
                    </motion.h2>
                    <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Testimonial Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-base-100 dark:bg-base-300 p-8 rounded-[2rem] shadow-xl border border-base-200 dark:border-base-400 relative group transition-all"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 text-5xl transition-colors">
                                <FaQuoteLeft />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={i < review.rating ? "fill-current" : "text-gray-300 dark:text-gray-500"}
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-base-content/70 dark:text-base-content/60 font-medium italic mb-8 leading-relaxed">
                                "{review.comment}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                                />
                                <div>
                                    <h4 className="font-black text-base-content dark:text-white uppercase text-sm tracking-tighter">
                                        {review.name}
                                    </h4>
                                    <p className="text-xs font-bold text-primary uppercase">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
