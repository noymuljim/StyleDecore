import React from 'react';
import Hero from '../Home/Hero/Hero';
import ServiceArea from '../Home/Map/ServiceArea';
import Services from '../Home/Services/Services';

const LandingPage = () => {
    return (
        <div >
            <Hero></Hero>
            <Services></Services>
            <ServiceArea></ServiceArea>
        </div> 
    );
};

export default LandingPage;