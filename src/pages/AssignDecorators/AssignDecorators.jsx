import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AssignDecorators = () => {
    const axiosSecure=useAxiosSecure()

     const { data: booking = [] } = useQuery({
        queryKey: ['bookings', 'panding-appoinment'],
        queryFn: async () => {
     const res = await axiosSecure.get('/bookings?appoinmentStatus=panding-appoinment')
            return res.data
        }
    })
    return (
        <div>
            <h1>assign:{booking.length}</h1>
        </div>
    );
};

export default AssignDecorators;