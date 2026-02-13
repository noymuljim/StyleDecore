import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { GrUserAdmin } from 'react-icons/gr';
import { RiAdminFill } from 'react-icons/ri';
import Swal from 'sweetalert2';

const UsersManagement = () => {
    const [searchText, setSearchText] = useState('')

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`)
            return res.data;
        }
    })
    const handleMakeAdmin = (user) => {
        const roleInfo = { role: 'admin' }

        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                console.log(res.data)

                if (res.data.modifiedCount) {

                    refetch();

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleRemoveAdmin = (user) => {

        Swal.fire({
            title: "Are you sure?",
            text: "Remove From admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {


                const roleInfo = { role: 'user' }
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();

                        }
                    })


                Swal.fire({
                    title: "Removed!",
                    text: `${user.displayName} removed from admin!`,

                    icon: "success"
                });
            }
        });

    }

    return (
        <div>
            <h2>Manage User:{users.length}</h2>

            {/* search */}

            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input onChange={(e) => setSearchText(e.target.value)}
                    type="search"
                    className="grow"
                    placeholder="Search users" />

            </label>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <td>
                                    {index + 1}
                                </td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.role}
                                </td>

                                <th>
                                    {
                                        user.role === 'admin' ?
                                            //admin hyle admin theke remove korar icon
                                            <button onClick={() => handleRemoveAdmin(user)}
                                                className='btn'>
                                                <GrUserAdmin />
                                            </button> : <button onClick={() => handleMakeAdmin(user)}
                                                className='btn text-green-500'>
                                                <RiAdminFill />

                                            </button>

                                    }
                                </th>
                                <th>
                                    action
                                </th>
                            </tr>)
                        }



                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default UsersManagement;