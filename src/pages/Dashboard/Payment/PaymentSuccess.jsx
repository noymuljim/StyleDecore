import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [paymentInfo, setPaymentInfo] = useState({})

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id')

    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)

                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                })
        }
    }, [sessionId, axiosSecure]);
    return (
        <div>
            <h1>success page</h1>
            <p>transaction ID:{paymentInfo.transactionId}</p>
            <p>your traking ID:{paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;