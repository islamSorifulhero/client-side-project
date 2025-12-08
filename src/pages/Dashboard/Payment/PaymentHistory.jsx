import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">My Payments / Bookings</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((p, i) => (
                            <tr key={p._id}>
                                <td>{i + 1}</td>
                                <td>{p.productTitle}</td>
                                <td>${p.price}</td>
                                <td>{p.paymentStatus}</td>
                                <td>{p.transactionId || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;



// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const PaymentHistory = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { data: payments = [] } = useQuery({
//         queryKey: ['payments', user.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/payments?email=${user.email}`)
//             return res.data;
//         }
//     })

//     return (
//         <div>
//             <h2 className="text-5xl">Payment History: {payments.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Amount</th>
//                             <th>Paid Time</th>
//                             <th>Transaction Id</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             payments.map((payment, index) => <tr key={payment._id}>
//                                 <th>{index + 1}</th>
//                                 <td>Cy Ganderton</td>
//                                 <td>${payment.amount}</td>
//                                 <td>{payment.paidAt}</td>
//                                 <td>{payment.transactionId}</td>
//                             </tr>)
//                         }


//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PaymentHistory;