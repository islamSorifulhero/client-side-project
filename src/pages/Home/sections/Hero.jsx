import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import homeImg from '../../../assets/Home-img.jpg'

const Hero = () => {
    return (
        <div className="bg-base-200 py-10">
            <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-10">

                {/* LEFT SIDE - TEXT */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 text-center lg:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        Welcome to Our Product Shop
                    </h1>

                    <p className="mt-5 text-gray-600 max-w-lg">
                        Discover top-quality products with the best deals.
                        Shop now and enjoy fast delivery to anywhere you want!
                    </p>

                    <Link to="/all-products" className="btn btn-primary mt-6">
                        Explore Products
                    </Link>
                </motion.div>

                {/* RIGHT SIDE - IMAGE */}
                <motion.img
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    src={homeImg}
                    alt="hero banner"
                    className="flex-1 w-full max-w-md rounded-xl shadow-xl"
                />
            </div>
        </div>
    );
};

export default Hero;
