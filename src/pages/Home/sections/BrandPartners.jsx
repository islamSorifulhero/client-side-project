import React from "react";
import { motion } from "framer-motion";

const partners = [
    { id: 1, name: "Zara", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg" },
    { id: 2, name: "H&M", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" },
    { id: 3, name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { id: 4, name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { id: 5, name: "Puma", logo: "https://i.ibb.co.com/k6zhXF5W/22836-15382228-2804926-c090d56b-image.jpg" },
    { id: 6, name: "Levi's", logo: "https://i.ibb.co.com/pB5YyZmH/garment-logo-design-sewing-machine-silhouette-combined-with-building-icon-in-a-creative-concept-vect.jpg" },
];

const BrandPartners = () => {
    return (
        <section className="py-16 bg-base-100 border-y border-base-content/20 overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-6 mb-10 text-center">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-base-content/50">
                    Trusted by Global Fashion Giants
                </p>
            </div>

            {/* Infinite Scroll Container */}
            <div className="flex relative">
                <motion.div
                    className="flex space-x-20 items-center justify-around min-w-full"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear"
                    }}
                >
                    {[...partners, ...partners].map((partner, index) => (
                        <div key={index} className="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-8 md:h-12 w-auto object-contain dark:invert transition-all"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BrandPartners;
