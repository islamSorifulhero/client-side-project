import React from 'react';
import { Link } from 'react-router';

const PaymentSuccess = () => {
    return (
        <div className="text-center py-20">
            <h2 className="text-4xl font-bold mb-4">Payment Successful!</h2>
            <p>Your booking is confirmed.</p>
            <Link to="/dashboard/my-orders" className="btn btn-primary mt-4">
                Go to My Orders
            </Link>
        </div>
    );
};

export default PaymentSuccess;



// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const PaymentSuccess = () => {
//     const [searchParams] = useSearchParams();
//     const [paymentInfo, setPaymentInfo] = useState({});
//     const sessionId = searchParams.get('session_id');
//     const axiosSecure = useAxiosSecure();

//     console.log(sessionId);

//     useEffect(() => {
//         if (sessionId) {
//             axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
//                 .then(res => {
//                     console.log(res.data)
//                     setPaymentInfo({
//                         transactionId: res.data.transactionId,
//                         trackingId : res.data.trackingId
//                     })
//                 })
//         }

//     }, [sessionId, axiosSecure])

//     return (
//         <div>
//             <h2 className="text-4xl">Payment successful</h2>
//             <p>Your TransactionId: {paymentInfo.transactionId}</p>
//             <p>Your Parcel Tracking id: {paymentInfo.trackingId}</p>
//         </div>
//     );
// };

// export default PaymentSuccess;