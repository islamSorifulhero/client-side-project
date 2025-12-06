import React from 'react';
import Car from "../../assets/banner/car.png";

const HowToWork = () => {
    const cards = [
        { title: "Booking Pick & Drop", description: "From personal packages to business shipments — we deliver on time, every time." },
        { title: "Cash On Delivery", description: "Quick and reliable delivery service for all your needs." },
        { title: "Delivery Hub", description: "Your packages are safe with our secure packaging." },
        { title: "Booking SME & Corporate", description: "We are always here to help with your delivery needs." },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className='font-extrabold text-3xl mb-5'>How it Works</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="card bg-base-100 shadow-sm">
                        <figure className="flex items-start justify-start">
                            <img className="ml-5 mt-3" src={Car} alt={card.title} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{card.title}</h2>
                            <p>{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowToWork;
