import React from 'react';
import Hero from './sections/Hero';
import ProductCategories from './sections/ProductCategories';
import FeaturedProducts from './sections/FeaturedProducts';
import ContactCTA from './sections/ContactCTA';
import ReviewsCarousel from './sections/Testimonials';
import HowItWorks from './sections/HowItWorks';
import WhyChooseUs from './sections/WhyChooseUs';
import NewsletterBanner from './sections/NewsletterBanner';
import StatsSection from './sections/StatsSection';
import Testimonials from './sections/Testimonials';
import OurServices from './sections/OurServices';
import SpecialOffer from './sections/SpecialOffer';
import BrandPartners from './sections/BrandPartners';
import FashionBlog from './sections/FashionBlog';
import WorkingProcess from './sections/WorkingProcess';


const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <ProductCategories></ProductCategories>
            <WhyChooseUs></WhyChooseUs>
            <FeaturedProducts></FeaturedProducts>
            <StatsSection></StatsSection>
            <OurServices></OurServices>
            <SpecialOffer></SpecialOffer>
            <HowItWorks></HowItWorks>
            <WorkingProcess></WorkingProcess>
            <Testimonials></Testimonials>
            <BrandPartners></BrandPartners>
            <FashionBlog></FashionBlog>
            <NewsletterBanner></NewsletterBanner>
            <ContactCTA></ContactCTA>
        </div>
    );
};

export default Home;