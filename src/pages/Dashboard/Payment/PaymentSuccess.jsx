import React, { useEffect } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const session_id = searchParams.get("session_id");

    if (!session_id) return;

    const confirmPayment = async () => {
      try {
        const res = await axiosSecure.post("/confirm-payment", { session_id });
        if (res.data.success) {
          toast.success("Payment successful! Booking confirmed.");
          navigate("/dashboard/my-orders");
        } else {
          toast.error("Payment verification failed.");
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
        toast.error("Payment confirmation error.");
        navigate("/dashboard");
      }
    };

    confirmPayment();
  }, [location.search]);

  return <p className="text-center py-20">Processing Payment...</p>;
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