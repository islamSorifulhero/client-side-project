import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.warning("Payment cancelled.");
    navigate("/dashboard");
  }, []);

  return <p className="text-center py-20">Payment Cancelled</p>;
};

export default PaymentCancelled;