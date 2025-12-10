import React from 'react';
import Hero from './sections/Hero';
import ProductCategories from './sections/ProductCategories';
import FeaturedProducts from './sections/FeaturedProducts';
import ContactCTA from './sections/ContactCTA';
import ReviewsCarousel from './sections/ReviewsCarousel';
import HowItWorks from './sections/HowItWorks';
import WhyChooseUs from './sections/WhyChooseUs';
import NewsletterBanner from './sections/NewsletterBanner';


const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <ProductCategories></ProductCategories>
            <FeaturedProducts></FeaturedProducts>
            <HowItWorks></HowItWorks>
            <ReviewsCarousel></ReviewsCarousel>
            <WhyChooseUs></WhyChooseUs>
            <NewsletterBanner></NewsletterBanner>
            <ContactCTA></ContactCTA>
        </div>
    );
};

export default Home;