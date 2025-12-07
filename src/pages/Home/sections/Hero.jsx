import React from "react";
import { Link } from "react-router";

const Hero = () => {
    return (
        <div className="hero bg-base-200 py-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src="https://i.ibb.co/0jMK6yq/hero-banner.jpg"
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">Welcome to Our Product Shop</h1>
                    <p className="py-6">
                        Discover top-quality products with the best deals. Shop now and enjoy
                        fast delivery anywhere!
                    </p>
                    <Link to="/all-products" className="btn btn-primary">
                        Explore Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
