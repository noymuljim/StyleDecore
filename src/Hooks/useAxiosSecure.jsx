import axios from 'axios';
import React from 'react';

const useAxiosSecure = () => {
    const axiosSecure =axios.create({
    baseURL:'http://localhost:4000'
})
    return axiosSecure;
};

export default useAxiosSecure;