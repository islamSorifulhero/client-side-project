import React from "react";

const AboutUs = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>

            <div className="space-y-4 text-lg leading-relaxed">
                <p>
                    আমরা একটি আধুনিক Garments Order & Production Tracking System,
                    যেখানে Buyer, Manager এবং Admin একই প্ল্যাটফর্মে পোশাকের order, production
                    status ও payment ম্যানেজ করতে পারে।
                </p>

                <p>
                    আমাদের লক্ষ্য হলো garments industry-তে একটি স্মার্ট, দ্রুত ও স্বচ্ছ
                    অর্ডার ম্যানেজমেন্ট সিস্টেম তৈরি করা, যেখানে অর্ডারের প্রতিটি ধাপ সহজে
                    ট্র্যাক করা যায়।
                </p>

                <p>
                    এই সিস্টেমের মাধ্যমে Buyer তার order দেখতে পারে, Manager production update দিতে পারে,
                    আর Admin পুরো system control করে।
                </p>

                <p>
                    আধুনিক UI, fully secure API এবং real-time dashboard মিলিয়ে এটি একটি
                    complete garments management solution।
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
