import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const myBookings = () => {
    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()
    const { data: bookings = [] } = useQuery({
        queryKey: ['myBookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`)
            return res.data;

        }
    })

    const haldlePayment = async (booking) => {
        const paymentInfo = {
            serviceCost: booking.serviceCost,
            bookingId: booking._id,
            userEmail: booking.userEmail,
            serviceName: booking.serviceName
        }
        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
        //  console.log(res.data)
        window.location.assign(res.data.url)

    }

    return (
        <div>
            <h2>My Bookingss only: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Service name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>trakingId Id</th>
                            <th>Appoinment status</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.serviceName}</td>
                                <td>{booking.serviceCost}</td>

                                <td>
                                    {
                                        booking.paymentStatus === 'paid' ?
                                            <span className='text-green-500'>paid</span>
                                            :
                                            //   <Link to={`/dashboard/payment/${booking._id}`} className='btn btn-sm btn-secondary'>pay</Link>
                                            <button className='btn btn-sm btn-secondary' onClick={() => haldlePayment(booking)}>Pay Now</button>
                                    }
                                </td>
                                <td>{booking.trakingId}</td>
                                <td>{booking.appoinmentStatus}</td>



                                <td>
                                    {/* <button 
                                        className='btn btn-sm hover:bg-primary'><MdDeleteForever />


                                    </button> */}
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default myBookings;