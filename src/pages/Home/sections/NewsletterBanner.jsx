import React from "react";

const NewsletterBanner = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-[#111827]">
            <div className="container mx-auto px-6">
                <div className="bg-primary rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full"></div>
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white rounded-full"></div>
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
                            Join Our <span className="text-yellow-400 italic">Fashion Club</span>
                        </h2>
                        <p className="text-indigo-100 font-bold mb-10 uppercase tracking-widest text-sm">
                            Subscribe to get early access to new collections and exclusive offers.
                        </p>

                        <form className="flex flex-col md:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="ENTER YOUR EMAIL"
                                className="flex-grow px-8 py-5 rounded-2xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:bg-white focus:text-black transition-all font-bold uppercase text-sm"
                            />
                            <button className="px-10 py-5 bg-yellow-400 text-black font-black uppercase rounded-2xl hover:bg-white transition-all shadow-xl">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterBanner;
