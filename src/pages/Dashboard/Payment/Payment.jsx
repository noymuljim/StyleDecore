import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Payment = () => {
  const { id } = useParams();
  const axiossecure = useAxiosSecure();

  const { isLoading, data: booking } = useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      const res = await axiossecure.get(`/booking/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

 
    const handlePayment=async()=>{
        const paymentInfo={
            cost:booking.serviceCost,
            bookingId: booking._id,
            userEmail: booking.userEmail,
            servicelName:booking.serviceName
        }

        const res= await axiossecure.post('/create-checkout-session',paymentInfo);
        console.log(res.data)
       
        window.location.href= res.data.url
    }

  return (
    <div>
      <h2>Please pay now: {booking.serviceName}</h2>
<button onClick={handlePayment}
            className='btn text-black bg-primary'>Pay Now</button>    </div>
  );
};

export default Payment;
