import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>


            <p className="text-base leading-7">
                If you have any questions, feedback, or want to reach out to our support
                team, feel free to contact us through the information below.
            </p>


            <div className="p-4 border rounded-2xl shadow space-y-3">
                <h2 className="text-xl font-semibold">Support Email</h2>
                <p>support@garmtracker.com</p>
            </div>


            <div className="p-4 border rounded-2xl shadow space-y-3">
                <h2 className="text-xl font-semibold">Phone</h2>
                <p>+880 1700 000000</p>
            </div>


            <div className="p-4 border rounded-2xl shadow space-y-3">
                <h2 className="text-xl font-semibold">Office Address</h2>
                <p>Mirpur, Dhaka, Bangladesh</p>
            </div>


            <form className="space-y-4 p-6 border rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-2">Send us a message</h2>
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 border rounded-xl"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 border rounded-xl"
                />
                <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full p-3 border rounded-xl"
                />
                <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;
