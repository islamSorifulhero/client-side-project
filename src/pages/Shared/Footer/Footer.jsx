import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Logo from "../../../components/Logo/Logo";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content transition-colors duration-500">
            {/* Top Footer Section */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Brand & Mission */}
                <div className="space-y-6">
                    <div className="flex items-center">
                        <Logo />
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-base-content/70">
                        Leading the future of garment production with transparency and innovation. 
                        We deliver quality apparel that blends modern style with sustainable craftsmanship.
                    </p>
                </div>

                {/* Quick Navigation */}
                <div>
                    <h3 className="text-lg font-black uppercase tracking-tighter text-base-content mb-6">
                        Explore
                    </h3>
                    <ul className="space-y-4 font-bold text-sm uppercase tracking-wider">
                        <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li><Link to="/all-products" className="hover:text-primary transition-colors">All-Products</Link></li>
                        <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Services/Categories */}
                <div>
                    <h3 className="text-lg font-black uppercase tracking-tighter text-base-content mb-6">
                        Categories
                    </h3>
                    <ul className="space-y-4 font-bold text-sm uppercase tracking-wider">
                        <li className="hover:text-primary cursor-pointer transition-colors">Men's Fashion</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">Women's Wear</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">Electronics</li>
                        <li className="hover:text-primary cursor-pointer transition-colors">Home Appliances</li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div>
                    <h3 className="text-lg font-black uppercase tracking-tighter text-base-content mb-6">
                        Get In Touch
                    </h3>
                    <ul className="space-y-4 font-medium text-sm">
                        <li className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-primary mt-1" />
                            <span>123 Fashion Street, Textile Hub<br />Dhaka, Bangladesh</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaPhoneAlt className="text-primary" />
                            <span>+88 01518-713398</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-primary" />
                            <span>support@garments2026.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-base-content/20">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60 text-center md:text-left text-base-content/70">
                        © {new Date().getFullYear()} Garments Project. All Rights Reserved.
                    </p>
                    <div className="flex gap-6 text-[10px] font-black uppercase tracking-tighter opacity-60">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
