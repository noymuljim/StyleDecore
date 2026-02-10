import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
       <div>
            <h2>calcelled</h2>
            <Link to={'/dashboard/my-bookings'} className='btn bg-red-400'>Try again</Link>
        </div>
    );
};

export default PaymentCancelled;