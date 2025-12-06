import React from 'react';
// import Banner from '../Banner/Banner';
import Brands from './Brands/Brands';
import Reviews from './Reviews/Reviews';
import Banner from './Banner/Banner';

const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            {/* <Banner></Banner> */}
            <Banner></Banner>
            {/* <HowToWork></HowToWork>
            <OurService></OurService> */}
            <Brands></Brands>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
        </div>
    );
};

export default Home;