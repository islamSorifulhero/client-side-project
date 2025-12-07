import React from 'react';
import Brands from './Brands/Brands';
import Reviews from './Reviews/Reviews';
import Banner from './Banner/Banner';
import HowToWork from '../HowToWork/HowToWork';
import OurService from '../OurService/OurService';
import Hero from './sections/Hero';
import ProductCategories from './sections/ProductCategories';
import FeaturedProducts from './sections/FeaturedProducts';
import ContactCTA from './sections/ContactCTA';
import ReviewsCarousel from './sections/ReviewsCarousel';
import HowItWorks from './sections/HowItWorks';
import WhyChooseUs from './sections/WhyChooseUs';
import NewsletterBanner from './sections/NewsletterBanner';

// const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            {/* <Banner></Banner>
            <HowToWork></HowToWork>
            <OurService></OurService>
            <Brands></Brands>
            <Reviews reviewsPromise={reviewsPromise}></Reviews> */}
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