import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ContactCTA = () => {
    return (
        <section className="py-20 bg-white dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">Experience Our <span className="text-primary">Craftsmanship</span></h2>
                <p className="text-gray-500 font-medium">We don't just make clothes, we ensure quality in every thread. Visit our state-of-the-art factory through this video.</p>
                <button className="btn btn-primary rounded-full px-10 font-black uppercase">Watch Full Story</button>
            </motion.div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[350px] border-8 border-gray-100 dark:border-gray-800">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/6v-ISi-wqJc?si=rGG6_utcZkN08YJ5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
    </section>
    );
};

export default ContactCTA;
