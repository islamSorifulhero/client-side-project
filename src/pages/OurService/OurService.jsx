import React from 'react';
import service from "../../assets/banner/service.png"

const OurService = () => {
     const cards = [
        { title: "Booking Pick & Drop", description: "From personal packages to business shipments — we deliver on time, every time." },
        { title: "Fast Delivery", description: "Quick and reliable delivery service for all your needs." },
        { title: "Secure Packaging", description: "Your packages are safe with our secure packaging." },
        { title: "24/7 Support", description: "We are always here to help with your delivery needs." },
        { title: "Affordable Pricing", description: "Get premium services at budget-friendly rates." },
        { title: "Easy Tracking", description: "Track your packages in real-time easily and reliably." },
    ];
    return (
        <div className="container mx-auto px-18 py-18 mb-10 bg-[#03373D] rounded-2xl">
            <h1 className='text-center font-semibold text-3xl text-white'>Our Service</h1>''
            <p className='text-center text-[#DADADA] mb-4'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="card bg-base-100 shadow-sm">
                        <figure>
                            <img className="ml-5 mt-3" src={service} alt={card.title} />
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

export default OurService;