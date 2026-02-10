import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const RootLayout = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
              <div className='min-h-screen'>
                  <Outlet></Outlet>
              </div>
            </div>
            <Footer></Footer>

        </div>
    );
};

export default RootLayout;