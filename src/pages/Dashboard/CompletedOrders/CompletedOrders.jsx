import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedOrders = () => {
    
     const { user } = useAuth()
      const axiosSecure = useAxiosSecure()

      const{ data: bookings = [], refetch }=useQuery({
queryKey: ['bookings', user.email, 'decorator_assigned'],
queryFn: async()=>{
    const res= await axiosSecure.get(`/bookings/decorator?decoratorEmail=${user.email}&appoinmentStatus=decoration_completed`)
      return res.data;
}


      })
    return (
          <div>
            <h2 className='text-3xl'> Completed Orders:{bookings.length}</h2>



                   <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Created At</th>
                            <th>Orders District</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookings.map((booking, index) => <tr key={booking._id}>
                                <th>{index + 1}</th>
                                <td>{booking.serviceName}</td>
                                <td>{booking.serviceCost}</td>
                                <td>{booking.createdAt}</td>
                                <td>{booking.userDistrict}</td>
                                <td>
                                    <button 
                                        className='btn rounded-3xl'>Find Decorators</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedOrders;