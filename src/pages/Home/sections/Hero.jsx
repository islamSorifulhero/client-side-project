import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <div className="hero bg-base-200 py-20">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <motion.img
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    src="https://i.ibb.co/0jMK6yq/hero-banner.jpg"
                    className="max-w-sm rounded-lg shadow-2xl"
                />

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl font-bold leading-snug">
                        Welcome to Our Product Shop
                    </h1>
                    <p className="py-6 text-gray-600">
                        Discover top-quality products with the best deals.
                        Shop now and enjoy fast delivery anywhere!
                    </p>

                    <Link to="/all-products" className="btn btn-primary">
                        Explore Products
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
