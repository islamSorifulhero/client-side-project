import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ContactCTA = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-linear-to-r/increasing from-indigo-500 to-teal-400 text-white py-16 text-center rounded-none mt-1"
        >
            <h2 className="text-3xl font-bold mb-4">
                Need Help or Have a Question?
            </h2>

            <p className="mb-6 text-lg">
                Our support team is ready to assist you anytime.
            </p>

            <Link to="/contact" className="btn bg-white text-primary border-none">
                Contact Us
            </Link>
        </motion.div>
    );
};

export default ContactCTA;
