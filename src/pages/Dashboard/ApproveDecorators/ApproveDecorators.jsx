import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaRegTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemove } from 'react-icons/io5';
import Swal from 'sweetalert2';

const ApproveDecorators = () => {
    const axiosSecure = useAxiosSecure()
    const { data: decorators = [], refetch } = useQuery({
        queryKey: ['decorators', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/decorators');
            return res.data;
        }
    })

    const updateDecoratorStatus = (decorator, status) => {
        const updateInfo = {
            status: status,
            email: decorator.email
        }
        axiosSecure.patch(`/decorators/${decorator._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `decorator status set to ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });

                }
            })
    }


    const handleApproval = (decorator) => {
        updateDecoratorStatus(decorator, 'approved')

    }

    const handleRejection = decorator => {
        updateDecoratorStatus(decorator, 'rejected')
    }
    const handleDelete = (id) => {
        // console.log(id)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.delete(`/decorators/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Rider has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });


    }
    return (
        <div>
            <h2 className='text-3xl'>Pending Approval:{decorators.length}</h2>


            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>

                            <th>Email</th>
                            <th>Speciality</th>
                            <th>Application Status</th>
                            <th>Work Status</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            decorators.map((decorator, i) => <tr>
                                <th>{i + 1}</th>
                                <td>{decorator.decoratorEmail}</td>
                                <td>{decorator.specialty}</td>
                                <td>
                                    <p className={`${decorator.status === 'approved' ? "text-green-500" : decorator.status === 'rejected'
                                        ? 'text-red-500'
                                        : 'text-black'}`}>{decorator.status}</p>
                                </td>
                                <td>{decorator.workStatus}</td>
                                <td>{decorator.createdAt}</td>

                                <td>
                                    <button onClick={() => handleApproval(decorator)}
                                        className='btn btn-sm'><FaUserCheck />
                                    </button>
                                    <button onClick={() => handleRejection(decorator)}
                                        className='btn mx-5 btn-sm'><IoPersonRemove />
                                    </button>
                                    <button onClick={() => handleDelete(decorator._id)}
                                        className='btn btn-sm'><FaRegTrashAlt />
                                    </button>
                                </td>




                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveDecorators;