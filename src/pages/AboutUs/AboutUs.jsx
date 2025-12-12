import React from "react";

const AboutUs = () => {
    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="text-base leading-7">
                Our Garments Order & Production Tracker System is designed to simplify and
                streamline the workflow between buyers, managers, and admins. We focus on
                transparency, efficiency, and real‑time updates so that everyone involved
                in the production pipeline can stay informed.
            </p>
            <p className="text-base leading-7">
                With our system, users can browse products, place orders, track booking
                status, and manage production progress seamlessly. Our mission is to
                provide a modern digital solution for garment industry tracking, ensuring
                better communication and faster decision‑making.
            </p>
            <div className="p-4 border rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
                <p>
                    To revolutionize the garment production workflow by offering a smart,
                    intuitive, and scalable digital platform that improves productivity.
                </p>
            </div>
            <div className="p-4 border rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-2">Our Values</h2>
                <ul className="list-disc ml-6 space-y-1">
                    <li>Transparency in order processing</li>
                    <li>Reliable and real‑time tracking</li>
                    <li>User‑friendly experience</li>
                    <li>Commitment to quality and accuracy</li>
                </ul>
            </div>
        </div>
    );
};

export default AboutUs;
