import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const reviews = [
    {
        name: "Rahim",
        text: "Amazing product quality! Delivery was super fast.",
    },
    {
        name: "Karima",
        text: "Loved the customer support. 10/10 experience!",
    },
    {
        name: "Jamil",
        text: "Best online shopping experience ever!",
    },
];

const ReviewsCarousel = () => {
    return (
        <div className="max-w-4xl mx-auto py-16 px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Customer Feedback</h2>

            <Swiper slidesPerView={1} autoplay={{ delay: 3000 }} loop={true}>
                {reviews.map((r, i) => (
                    <SwiperSlide key={i}>
                        <div className="card shadow-xl p-8 text-center">
                            <p className="text-lg italic mb-4">"{r.text}"</p>
                            <h3 className="text-xl font-bold">— {r.name}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ReviewsCarousel;
