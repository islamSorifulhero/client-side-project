import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from './SocialLogin/SocialLogin';
import { toast } from 'react-toastify';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                toast.success('Login successful');
                navigate(location?.state || '/');
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl">
            <h3 className="text-3xl text-center">Please Login</h3>
            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <label className="label">Email</label>
                <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                {errors.email && <p className='text-red-500'>Email is required</p>}

                <label className="label">Password</label>
                <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>}

                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn btn-neutral mt-4">Login</button>
            </form>
            <p>New to Garments Account? <a className='text-blue-400 underline' href="/register">Register</a></p>
            <SocialLogin />
        </div>
    );
};

export default Login;
