import React from "react";
import { Link } from "react-router";

const ContactCTA = () => {
    return (
        <div className="bg-primary text-white py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
                Need Help or Have a Question?
            </h2>
            <p className="mb-6">
                Our support team is ready to assist you anytime.
            </p>
            <Link to="/contact" className="btn bg-white text-primary">
                Contact Us
            </Link>
        </div>
    );
};

export default ContactCTA;
