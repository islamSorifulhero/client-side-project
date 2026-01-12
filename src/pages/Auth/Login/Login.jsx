import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from './SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const Login = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const demoUser = {
        email: "soriful@islam.com",
        password: "Asdfghj"
    };

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(() => {
                toast.success('Login Successful');
                navigate(location.state?.from || '/');
            })
            .catch(() => toast.error('Invalid email or password'));
    };

    const handleDemoLogin = () => {
        setValue("email", demoUser.email);
        setValue("password", demoUser.password);
        signInUser(demoUser.email, demoUser.password)
            .then(() => {
                toast.success('Demo Login Successful');
                navigate('/');
            })
            .catch(() => toast.error('Demo login failed'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-base-100 shadow-2xl overflow-hidden lg:rounded-3xl m-4">

                <div className="hidden lg:flex flex-col justify-center items-center lg:w-1/2 bg-primary p-12 text-white relative">
                    <div className="absolute inset-0 opacity-20">
                        <img
                            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                            alt="Background"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 text-center"
                    >
                        <h2 className="text-5xl font-black mb-6 uppercase">Welcome Back!</h2>
                        <p className="text-lg font-medium opacity-90">
                            The heart of craftsmanship awaits. Log in to manage your garments production.
                        </p>
                    </motion.div>
                </div>

                {/* 📝 Right Side: Login Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-16">
                    <div className="max-w-md mx-auto">
                        <h3 className="text-4xl font-black text-base-content mb-2">Please Login</h3>
                        <p className="text-base-content/60 mb-8">Enter your credentials to access your account.</p>

                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                            <div className="form-control">
                                <label className="label font-bold">Email Address</label>
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                                    placeholder="name@company.com"
                                />
                                {errors.email && <span className="text-error text-sm mt-1">Email is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label font-bold">Password</label>
                                <input
                                    type="password"
                                    {...register('password', { required: true, minLength: 6 })}
                                    className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                                    placeholder="••••••••"
                                />
                                {errors.password && <span className="text-error text-sm mt-1">Minimum 6 characters required</span>}
                            </div>

                            <div className="flex justify-end">
                                <Link className="link link-primary no-underline font-semibold text-sm">Forgot password?</Link>
                            </div>

                            <button type="submit" className="btn btn-primary w-full text-white font-bold uppercase">
                                Sign In
                            </button>

                            <button
                                type="button"
                                onClick={handleDemoLogin}
                                className="btn btn-outline btn-secondary w-full font-bold uppercase"
                            >
                                Demo Access
                            </button>
                        </form>

                        <div className="divider my-8 font-medium text-base-content/40">OR CONTINUE WITH</div>

                        <SocialLogin />

                        <p className="text-center mt-8 font-medium">
                            Don't have an account?
                            <Link to="/register" className="text-primary hover:underline ml-2">Create Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;