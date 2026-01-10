import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const SpecialOffer = () => {
    return (
        <section className="py-12 bg-base-100 dark:bg-base-200 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-primary to-indigo-700 text-white shadow-2xl"
                >
                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 p-10 lg:p-20">
                        {/* Text Section */}
                        <div className="space-y-6 text-center lg:text-left">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-block px-6 py-2 bg-white text-primary font-black uppercase text-xs rounded-full tracking-widest shadow-lg"
                            >
                                Limited Time Offer
                            </motion.span>

                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                                Winter Season <br />
                                <span className="text-yellow-400 italic">Up to 60% Off</span>
                            </h2>

                            <p className="text-lg dark:text-gray-300 font-medium max-w-md mx-auto lg:mx-0">
                                Upgrade your wardrobe with our premium fabrics. Get exclusive discounts on our latest 2026 collection.
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                                <Link
                                    to="/all-products"
                                    className="px-10 py-4 bg-white text-black font-black uppercase rounded-2xl hover:bg-yellow-400 transition-all duration-300 shadow-xl"
                                >
                                    Shop Now
                                </Link>
                                <button className="px-10 py-4 bg-transparent border-2 border-white/50 text-white font-black uppercase rounded-2xl hover:bg-white/10 transition-all">
                                    Claim Coupon
                                </button>
                            </div>
                        </div>

                        {/* Visual Badge / Timer */}
                        <div className="hidden lg:flex justify-center">
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-64 h-64 border-8 border-white/20 rounded-full flex flex-col items-center justify-center text-center backdrop-blur-sm bg-white/5 shadow-2xl"
                            >
                                <span className="text-6xl font-black italic">60%</span>
                                <span className="text-xl font-bold uppercase tracking-widest">Discount</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SpecialOffer;
