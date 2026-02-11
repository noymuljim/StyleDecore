import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const {data: payments=[]}=useQuery({
        queryKey:['payments',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/payment?email=${user.email}`)
            return res.data
        }
    })

    return (
        <div>
            <h1 className='text-3xl'>Payment history:{payments.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Service name</th>
                            <th>Amount</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment,i)=><tr>
                            <th>{i+1}</th>
                            <td>{payment.serviceName}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.transactionId}</td>
                            
                        </tr>)
                        }                 
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;