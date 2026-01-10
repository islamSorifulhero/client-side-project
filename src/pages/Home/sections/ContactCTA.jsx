import React from "react";
import { motion } from "framer-motion";

const ContactCTA = () => {
    return (
        <section className="py-20 bg-base-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-base-content">
                        Experience Our <span className="text-primary">Craftsmanship</span>
                    </h2>
                    <p className="text-base-content/70 font-medium text-lg">
                        We don't just make clothes, we ensure quality in every thread.
                        Visit our state-of-the-art factory through this video.
                    </p>
                    <button className="btn btn-primary rounded-full px-10 py-4 font-black uppercase text-sm md:text-base">
                        Watch Full Story
                    </button>
                </motion.div>

                {/* Video */}
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-base-200">
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            className="w-full h-full rounded-[2rem]"
                            src="https://www.youtube.com/embed/6v-ISi-wqJc?si=rGG6_utcZkN08YJ5"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactCTA;
