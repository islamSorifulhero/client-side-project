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




// import React from 'react';
// import { Link } from 'react-router';

// const PaymentCancelled = () => {
//     return (
//         <div>
//             <h2>Payment is cancelled. Please try again</h2>
//             <Link to="/dashboard/my-parcels">
//             <button className='btn btn-primary text-black'>Try Again</button></Link>
//         </div>
//     );
// };

// export default PaymentCancelled;