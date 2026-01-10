import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import homeImg from "../../../assets/Home-img.jpg";

const Hero = () => {
    return (
        <section className="relative min-h-[65vh] lg:min-h-[70vh] flex items-center overflow-hidden bg-base-100 py-3">

            {/* Decorative Background Blobs */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary/10 blur-3xl rounded-full animate-pulse"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* LEFT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                >
                    <span className="inline-block px-4 py-1 mb-4 text-xs font-black tracking-widest text-primary bg-primary/10 rounded-full uppercase">
                        New Collection 2026
                    </span>

                    <h1 className="text-4xl md:text-6xl font-black leading-tight text-base-content uppercase">
                        Elevate Your{" "}
                        <span className="text-primary italic">Style</span> <br />
                        With Garments
                    </h1>

                    <p className="mt-6 text-base-content/70 text-lg font-medium max-w-lg leading-relaxed">
                        Experience the fusion of quality and comfort. Discover premium
                        textile products crafted for modern fashion.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link
                            to="/all-products"
                            className="btn btn-primary btn-lg px-8 font-black uppercase shadow-lg hover:scale-105 transition-transform"
                        >
                            Explore Products
                        </Link>
                        <Link
                            to="/about"
                            className="btn btn-outline btn-lg px-8 font-black uppercase"
                        >
                            Our Story
                        </Link>
                    </div>
                </motion.div>

                {/* RIGHT IMAGE */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 40 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative mx-auto lg:ml-auto"
                >
                    <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl"></div>

                    <div className="relative overflow-hidden rounded-2xl border border-base-300 shadow-2xl">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                            src={homeImg}
                            alt="Premium Garments"
                            className="w-full max-w-lg h-[350px] md:h-[450px] object-cover"
                        />

                        {/* Floating Badge */}
                        <div className="absolute bottom-6 left-6 bg-base-100/80 backdrop-blur-md p-4 rounded-xl shadow hidden md:block">
                            <p className="text-base-content font-black text-2xl">
                                40% OFF
                            </p>
                            <p className="text-base-content/60 text-xs font-bold uppercase tracking-widest">
                                Seasonal Sale
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
