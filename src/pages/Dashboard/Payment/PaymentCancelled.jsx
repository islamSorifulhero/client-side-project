import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className="text-center py-20">
            <h2 className="text-3xl font-bold mb-4">Payment Cancelled</h2>
            <p>Please try again or use a different payment method.</p>
            <Link to="/all-products" className="btn btn-primary mt-4">
                Back to Products
            </Link>
        </div>
    );
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