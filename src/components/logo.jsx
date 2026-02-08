import React from 'react';
import logo from '../assets/logo1.png'
const Logo = () => {
    return (
        <div className='flex items-end'>
            <img className='h-[50px] w-[50px]' src={logo} alt="" />
            <h3 className="text-2xl font-bold -ms-7.5"><span className='text-sky-500 '>Style</span>Decor</h3>
        </div>
    );
};

export default Logo;