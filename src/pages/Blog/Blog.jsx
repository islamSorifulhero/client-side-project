import React from "react";

const Blog = () => {
    const blogs = [
        {
            id: 1,
            title: "Future of Sustainable Garments",
            date: "Jan 10, 2026",
            desc: "How eco-friendly materials are reshaping the fashion industry...",
            img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 2,
            title: "Efficiency in Production Tracking",
            date: "Jan 05, 2026",
            desc: "The impact of real-time monitoring on factory deadlines...",
            img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=500&q=60"
        }
    ];

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8 min-h-screen">
            <h1 className="text-3xl font-black uppercase tracking-tighter">Industry <span className="text-primary">Insights</span></h1>
            <div className="grid md:grid-cols-2 gap-8">
                {blogs.map(blog => (
                    <div key={blog.id} className="group bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 transition-all hover:-translate-y-2">
                        <img src={blog.img} alt={blog.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <p className="text-xs font-bold text-primary uppercase mb-2">{blog.date}</p>
                            <h2 className="text-xl font-black mb-3">{blog.title}</h2>
                            <p className="text-sm text-gray-500 mb-4">{blog.desc}</p>
                            <button className="text-sm font-black uppercase border-b-2 border-primary">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;