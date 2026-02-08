import React from 'react';
import { Outlet } from 'react-router';
import authImg from "../assets/login1.png";

const AuthLayout = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${authImg})` }}
        >
            {/* Optional overlay for readability */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Centered form */}
            <div className="relative w-full max-w-md p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
