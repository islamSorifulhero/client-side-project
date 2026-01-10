import React from "react";

const NewsletterBanner = () => {
  return (
    <section className="py-20 bg-base-100 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="bg-primary dark:bg-indigo-700 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl transition-colors duration-500">

          {/* Decorative Background Circles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 dark:bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/20 dark:bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
              Join Our <span className="text-yellow-400 italic">Fashion Club</span>
            </h2>

            {/* Description */}
            <p className="text-white/80 dark:text-white/70 font-bold mb-10 uppercase tracking-widest text-sm">
              Subscribe to get early access to new collections and exclusive offers.
            </p>

            {/* Form */}
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="flex-grow px-8 py-5 rounded-2xl 
                           bg-white/20 dark:bg-white/10 
                           border-2 border-white/30 dark:border-white/20
                           text-white dark:text-white 
                           placeholder:text-white/60 dark:placeholder:text-white/50
                           focus:outline-none focus:bg-white dark:focus:bg-gray-200
                           focus:text-black dark:focus:text-black
                           transition-all duration-300 font-bold uppercase text-sm"
              />
              <button className="px-10 py-5 bg-yellow-400 text-black font-black uppercase rounded-2xl hover:bg-white dark:hover:bg-yellow-500 transition-all shadow-xl">
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
