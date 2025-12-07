import React from "react";

const NewsletterBanner = () => {
    return (
        <div className="bg-linear-to-t from-sky-500 to-indigo-500 text-white py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
            <p className="mb-6">Subscribe to get offers, discounts & new product alerts.</p>

            <div className="join">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="input join-item text-black"
                />
                <button className="btn join-item bg-white text-primary font-bold">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default NewsletterBanner;
