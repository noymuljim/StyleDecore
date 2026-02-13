import React from 'react';
import { Link } from 'react-router';
import forbiddenAnimation from '../assets/error.json';
import Lottie from 'lottie-react';

const Forbidden = () => {
    return (
        <div>
            <div className="min-h-screen flex flex-col justify-center items-center gap-4">
            <h1 className='text-3xl font-bold text-red-500'>Access is forbidden for you!</h1>

                {/* Lottie Animation */}
                <div className="w-72 md:w-96">
                    <Lottie
                        animationData={forbiddenAnimation}
                        loop={true}
                    />
                </div>
                <div className='flex'>
                    <Link to="/"><button className="btn">Go Home</button>
                    </Link>
                    <Link to="/dashboard"><button className="btn">Go Dashboard</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;