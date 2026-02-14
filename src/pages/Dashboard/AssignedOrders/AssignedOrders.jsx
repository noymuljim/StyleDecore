import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignedOrders = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings', user.email, 'decorator_assigned'],

        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/decorator?decoratorEmail=${user.email}&appoinmentStatus=decorator_assigned`)
            return res.data
        }
    })

    const handleDecoratorStatusUpdate = (booking, status) => {
        const statusInfo = { appoinmentStatus: status , 
                       decoratorId:bookings.decoratorId
}
        
        let message = `parcel status updated with ${status.split('_').join(' ')}`

        axiosSecure.patch(`/bookings/${booking._id}/status`, statusInfo)
            .then(res => {

                if (res.data.modifiedCount) {
                    refetch()

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div>
            <h2 className='text-3xl'>Orders Panding to accept:{bookings.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookings.map((booking, i) => <tr>
                                <th>{i + 1}</th>
                                <td>{booking.serviceName}</td>


                                 <td>
                                    {booking.deliveryStatus === 'driver_assigned' ?

                                        <>
                                            <button onClick={() => handleDecoratorStatusUpdate(booking,'decorator arriving')}
                                                className='btn btn-primary text-black'>Accept</button>
                                            <button className='btn btn-warning text-black'>Reject</button>
                                        </> :
                                        <h2 className='text-blue-400'>Accepted</h2>

                                    }

                                </td>
                                <button onClick={() => handleDecoratorStatusUpdate(booking,'decoration_in_process')}
                                    className='btn btn-primary text-black mx-4'>Marked work in process</button>
                                <button onClick={() => handleDecoratorStatusUpdate(booking,'decoration_completed')}
                                    className='btn btn-primary text-black'>Marked As Completed</button>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedOrders;