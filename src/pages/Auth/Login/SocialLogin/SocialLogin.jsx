import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const SocialLogin = () => {
    const { signInGoogle } = useAuth()
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(result => {
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                    role: 'buyer',
                    status: 'pending'
                };

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        toast.success('Logged in successfully');
                        navigate(location.state || '/');
                    })
                    .catch(error => toast.error('Failed to store user in database'));
            })
            .catch(error => toast.error(error.message));
    };

    return (
        <div className='text-center pb-8'>
            <p className='mb-2'>OR</p>
            <button
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5]">
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;
