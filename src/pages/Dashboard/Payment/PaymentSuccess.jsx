// src/pages/Dashboard/Payment/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [info, setInfo] = useState(null);
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;
    // call server endpoint that will verify session and return trackingId / booking info
    axiosSecure.get(`/payment-success?session_id=${sessionId}`)
      .then(res => {
        setInfo(res.data); // expect { success: true, trackingId, transactionId, ... }
      })
      .catch(err => {
        console.error("Payment success fetch error:", err);
      });
  }, [sessionId, axiosSecure]);

  if (!sessionId) return <p className="py-8 text-center">No session id provided.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Payment Successful</h2>

      {info ? (
        <div className="space-y-2">
          <p>Transaction ID: <strong>{info.transactionId}</strong></p>
          <p>Tracking ID: <strong>{info.trackingId}</strong></p>
          <p>Message: {info.message || "Payment processed successfully."}</p>
        </div>
      ) : (
        <p>Verifying payment, please wait...</p>
      )}
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