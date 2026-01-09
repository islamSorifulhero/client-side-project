import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import homeImg from '../../../assets/Home-img.jpg';

const Hero = () => {
    return (
        <section className="py-3 relative min-h-[65vh] lg:min-h-[70vh] flex items-center overflow-hidden 
            bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] dark:from-black dark:via-gray-900 dark:to-black">
            
            {/* Background Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary/5 blur-3xl rounded-full animate-pulse"></div>

            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* LEFT SIDE - TEXT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center lg:text-left"
                >
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="inline-block px-4 py-1 mb-4 text-xs font-black tracking-widest text-primary bg-primary/10 rounded-full uppercase"
                    >
                        New Collection 2026
                    </motion.span>
                    
                    <h1 className="text-4xl md:text-6xl font-black leading-tight text-white uppercase tracking-tight">
                        Elevate Your <span className="text-primary italic">Style</span> <br />
                        With Garments
                    </h1>

                    <p className="mt-6 text-gray-400 text-lg font-medium max-w-lg leading-relaxed">
                        Experience the fusion of quality and comfort. Discover top-tier textile products with exclusive deals crafted just for you.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link 
                            to="/all-products" 
                            className="btn btn-primary btn-lg px-8 font-black uppercase shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                        >
                            Explore Products
                        </Link>
                        <Link 
                            to="/about" 
                            className="btn btn-outline border-white text-white btn-lg px-8 font-black uppercase hover:bg-white hover:text-black transition-all"
                        >
                            Our Story
                        </Link>
                    </div>
                </motion.div>

                {/* RIGHT SIDE - IMAGE WITH EFFECTS */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative group mx-auto lg:ml-auto"
                >
                    {/* Image Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                            src={homeImg}
                            alt="Premium Garments"
                            className="w-full max-w-lg h-[350px] md:h-[450px] object-cover"
                        />
                        
                        {/* Floating Badge */}
                        <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 hidden md:block">
                            <p className="text-white font-black text-2xl">40% OFF</p>
                            <p className="text-gray-300 text-xs font-bold uppercase tracking-widest">Seasonal Sale</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;