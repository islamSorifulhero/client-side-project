import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    setError(null);

    axiosSecure.get(`/payment-success?session_id=${sessionId}`)
      .then(res => {
        if (res.data.success) {
          setInfo(res.data);
        } else {
          setError(res.data.message || "Payment verification failed.");
        }
      })
      .catch(err => {
        console.error("Payment success fetch error:", err);
        setError(err.response?.data?.message || "An unexpected error occurred during verification.");
      });
  }, [sessionId, axiosSecure]);

  if (!sessionId) return <p className="py-8 text-center">No session id provided.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Payment Verification</h2>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <p className="font-bold">Payment Verification Failed!</p>
          <p>{error}</p>
        </div>
      ) : info ? (
        <div className="space-y-4 bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-xl font-semibold text-green-600">✅ Payment Successful!</h3>
          <p>Transaction ID: <strong>{info.transactionId}</strong></p>
          <p>Tracking ID: <strong>{info.trackingId || 'N/A'}</strong></p>
          <p className="text-gray-600">Message: {info.message || "Payment processed successfully and order status updated."}</p>
        </div>
      ) : (
        <p className="text-lg text-blue-600">Verifying payment, please wait...</p>
      )}
    </div>
  );
};

export default PaymentSuccess;