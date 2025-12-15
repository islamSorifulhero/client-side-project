// tailwind.config.js

module.exports = {
    // 1. ডার্ক মোডকে 'class' ভিত্তিক করুন
    darkMode: 'class', 
    content: [
        "./index.html",
    "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {},
    },
    // 2. Daisy UI প্লাগইন এবং থিম যোগ করুন
    plugins: [require('daisyui')],
    daisyui: {
        themes: ["light", "dark"], // এখানে light এবং dark থিম থাকতে হবে
    },
};