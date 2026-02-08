import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ServiceCard from './ServiceCard/ServiceCard';

const Services = () => {

    const axiosSecure = useAxiosSecure()

    const { data: services = [], isLoading } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const res = await axiosSecure.get('/service');
            return res.data;
        }
    });
    if (isLoading) {
  return <span className="loading loading-spinner"></span>;
}


    return (
        <div className='max-w-7xl mx-auto'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {
                    services.map(service => (
                        <ServiceCard key={service._id} service={service} />
                    ))
                }
            </div>

        </div>
    );
};

export default Services;