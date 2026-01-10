import React from "react";
import { motion } from "framer-motion";
import { FaShippingFast, FaShieldAlt, FaUndoAlt, FaHeadset } from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Fast Shipping",
    desc: "Get your favorite garments delivered within 24-48 hours across the country.",
    icon: <FaShippingFast />,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Quality Control",
    desc: "Each product undergoes 3 layers of strict quality inspection before shipping.",
    icon: <FaShieldAlt />,
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Easy Returns",
    desc: "Not satisfied with the fit? Return within 7 days with no questions asked.",
    icon: <FaUndoAlt />,
    color: "bg-orange-500"
  },
  {
    id: 4,
    title: "24/7 Support",
    desc: "Our dedicated fashion experts are always online to help you with your style.",
    icon: <FaHeadset />,
    color: "bg-purple-500"
  }
];

const OurServices = () => {
  return (
    <section className="py-20 bg-base-100 dark:bg-base-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter"
          >
            Premium <span className="text-primary">Services</span>
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-base-100 dark:bg-base-300 rounded-[2.5rem] border border-base-200 dark:border-base-400 transition-all duration-300 group shadow-lg hover:shadow-2xl"
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 ${service.color} text-white text-3xl flex items-center justify-center rounded-2xl mb-6 shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                {service.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-black text-base-content dark:text-white uppercase mb-4 tracking-tight">
                {service.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
