import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignDecorators = () => {
    const [selectedBooking, setSelectedBooking] = useState(null)

    const decorModalRef = useRef()

    const axiosSecure = useAxiosSecure()

    const { data: bookings = [], refetch: bookingsRefetch } = useQuery({
        queryKey: ['bookings', 'panding-appoinment'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings?appoinmentStatus=panding-appoinment')
            return res.data
        }
    })
    const { data: decorators = [] } = useQuery({
        queryKey: ['bookings', selectedBooking?.userDistrict, 'available'],
        enabled: !!selectedBooking,

        queryFn: async () => {
            const res = await axiosSecure(`/decorators?status=approved&{selectedBooking.
                           userDistrict&workStatus=available`);
            return res.data;
        }
    })
    const openAssignDecorModal = (booking) => {
        setSelectedBooking(booking)

        decorModalRef.current.showModal()
    }


    const handleAssignDecorator = decorator => {

        const decoratorAssignInfo = {
            decoratorId: decorator._id,
            decoratorEmail: decorator.email,
            decoratorName: decorator.name,
            bookingId: selectedBooking._id
        }

        axiosSecure.patch(`/bookings/${selectedBooking._id}`, decoratorAssignInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    decorModalRef.current.close();

                    bookingsRefetch();


                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Rider hasbeen assigned",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }
    return (
        <div>
            <h1>assign:{bookings.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Function name</th>
                            <th>Cost</th>
                            <th>Created At</th>
                            <th>Pickup Region</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) => <tr>
                                <th>{i + 1}</th>
                                <td>{booking.serviceName}</td>
                                <td>{booking.serviceCost}</td>
                                <td>{booking.createdAt}</td>
                                <td>{booking.userRegion}</td>
                                <td>
                                    <button onClick={() => openAssignDecorModal(booking)}
                                        className='btn rounded-3xl border-1 border-blue-400 text-pink-500'>Assign decorator</button>
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
            <dialog ref={decorModalRef}
                //id="my_modal_5" 
                className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Decorators:{decorators.length}!</h3>

                    {/* modal table */}
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>

                                    <th>Email</th>
                                    <th>Action</th>


                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    decorators.map((decorator, i) => <tr key={decorator._id}>
                                        <th>{i + 1}</th>
                                        <td>{decorator.decoratorEmail}</td>
                                        <td>
                                            <button onClick={() => handleAssignDecorator(decorator)}
                                                className='btn btn-primary text-black'>Assign</button>
                                        </td>
                                    </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignDecorators;