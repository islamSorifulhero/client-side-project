import React from "react";
import { Link } from "react-router";

const WhyChooseUs = () => {
    return (
        <section className="py-16 bg-base-200">
            <div className="container mx-auto px-6">
                <div className="rounded-2xl bg-primary text-primary-content p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Text Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Ready to Upgrade Your Style?
                        </h2>
                        <p className="mt-4 max-w-xl text-primary-content/90">
                            Discover the latest fashion trends, exclusive collections, and
                            special offers tailored just for you. Start shopping today and
                            experience premium quality like never before.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/all-products"
                            className="btn btn-secondary btn-lg text-secondary-content"
                        >
                            Explore Products
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-outline btn-lg border-primary-content text-primary-content hover:bg-primary-content hover:text-primary"
                        >
                            Create Free Account
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
