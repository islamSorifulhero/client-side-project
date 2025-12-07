import React from "react";

const categories = [
    { name: "Electronics", img: "https://i.ibb.co/smKdNbt/c1.jpg" },
    { name: "Fashion", img: "https://i.ibb.co/0jVKc7C/c2.jpg" },
    { name: "Home Appliances", img: "https://i.ibb.co/pdxj1Kx/c3.jpg" },
];

const ProductCategories = () => {
    return (
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Shop By Category</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((c, i) => (
                    <div key={i} className="card shadow-lg">
                        <figure>
                            <img src={c.img} alt={c.name} className="h-48 w-full object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="text-xl font-semibold">{c.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCategories;
