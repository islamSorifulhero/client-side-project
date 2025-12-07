import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from './SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                toast.success('Login Successful');
                navigate(location.state?.from || '/'); // redirect after login
            })
            .catch(error => {
                toast.error('Invalid email or password');
            });
    };

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl mt-20">
            <h3 className="text-3xl text-center font-bold mb-4">Please Login</h3>
            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <label className="label">Email</label>
                <input
                    type="email"
                    {...register('email', { required: true })}
                    className="input input-bordered w-full"
                    placeholder="Email"
                />
                {errors.email && <p className='text-red-500'>Email is required</p>}

                <label className="label">Password</label>
                <input
                    type="password"
                    {...register('password', { required: true, minLength: 6 })}
                    className="input input-bordered w-full"
                    placeholder="Password"
                />
                {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 characters</p>}

                <div className="mt-2">
                    <Link className="link link-hover text-sm">Forgot password?</Link>
                </div>

                <button type="submit" className="btn btn-primary mt-4 w-full">Login</button>
            </form>

            <p className='text-center mt-4'>New to Garments Account?
                <Link className='text-blue-400 underline ml-1' to="/register">Register</Link>
            </p>

            <div className="mt-4">
                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;
