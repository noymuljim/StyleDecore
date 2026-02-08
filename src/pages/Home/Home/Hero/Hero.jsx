import React from 'react';
import hero1 from "../../../../assets/hero1.png";
import hero2 from "../../../../assets/hero2.png";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            stopOnHover={false}
            showStatus={false}
            showIndicators={false}
            interval={2000}
            swipeable
        >
           
            <div
                className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${hero1})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 text-center text-white px-4 space-y-4">
                    <h1 className="font-bold text-5xl md:text-8xl">
                        Turn Your <span className="text-sky-400">Moments</span> into <br />
                        <span className="text-pink-400">Masterpieces</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg text-gray-200">
                        Book expert decorators for homes, weddings, and events — all in one place.
                    </p>

                    <button className="btn btn-primary px-8">
                        Book Decoration Service
                    </button>
                </div>
            </div>

           
            <div
                className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${hero2})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 text-center text-white px-4 space-y-4">
                    <h1 className="font-bold text-5xl md:text-8xl">
                        Design the <span className="text-pink-400">Perfect</span> <br />
                        Space for Every <span className="text-sky-400">Celebration</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg text-gray-200">
                        From elegant home décor to grand ceremonies — we bring your vision to life.
                    </p>

                    <button className="btn btn-primary px-8">
                        Book Decoration Service
                    </button>
                </div>
            </div>
        </Carousel>
    );
};

export default Hero;
