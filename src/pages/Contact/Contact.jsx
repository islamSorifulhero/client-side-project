import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert("Your message has been submitted!");
        toast.success("Your message has been submitted!")
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="max-w-xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

            <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow p-6 rounded">
                <div>
                    <label className="block font-semibold mb-1">Your Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Your Message</label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded h-32"
                        placeholder="Write something..."
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;
