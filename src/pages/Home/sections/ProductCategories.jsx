import React from "react";
import { motion } from "framer-motion";
import Electronic from "../../../assets/Electronic-Devices.png"
import Fashion from "../../../assets/Fashion.jpg"
import HomeAppliances from "../../../assets/Home appliances.jpg"

const categories = [
    { name: "Electronics", img: Electronic },
    { name: "Fashion", img: Fashion },
    { name: "Home Appliances", img: HomeAppliances },]

const ProductCategories = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Shop By Category
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((c, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="card shadow-xl bg-base-100 rounded-xl"
                    >
                        <figure>
                            <img
                                src={c.img}
                                alt={c.name}
                                className="h-48 w-full object-cover rounded-t-xl"
                            />
                        </figure>
                        <div className="card-body text-center">
                            <h2 className="text-xl font-semibold">{c.name}</h2>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProductCategories;
