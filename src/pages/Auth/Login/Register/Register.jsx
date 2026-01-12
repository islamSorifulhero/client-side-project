import React from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {
        const profileImg = data.photo[0];

        const passRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (!passRegex.test(data.password)) {
            toast.error('Password must contain uppercase, lowercase & at least 6 characters');
            return;
        }

        registerUser(data.email, data.password)
            .then(() => {
                const formData = new FormData();
                formData.append('image', profileImg);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        updateUserProfile({ displayName: data.name, photoURL })
                            .then(() => {
                                const userInfo = {
                                    email: data.email,
                                    displayName: data.name,
                                    photoURL,
                                    role: data.role,
                                    status: 'pending'
                                };

                                axiosSecure.post('/users', userInfo)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            toast.success('User registered successfully!');
                                            navigate(location.state?.from || '/login');
                                        }
                                    });
                            })
                            .catch(error => toast.error(error.message));
                    })
                    .catch(() => toast.error('Image upload failed'));
            })
            .catch(error => toast.error(error.message));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-10">
            <div className="flex flex-col lg:flex-row-reverse w-full max-w-6xl bg-base-100 shadow-2xl overflow-hidden lg:rounded-3xl m-4">
                
                {/* 🎨 Right Side: Decorative Section (Register Theme) */}
                <div className="hidden lg:flex flex-col justify-center items-center lg:w-1/2 bg-secondary p-12 text-white relative">
                    <div className="absolute inset-0 opacity-20">
                        <img 
                            src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg" 
                            alt="Textile Working" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative z-10 text-center"
                    >
                        <h2 className="text-5xl font-black mb-6 uppercase">Join Our Hub</h2>
                        <p className="text-lg font-medium opacity-90">
                            Be a part of our garment production family. Register today to start your journey.
                        </p>
                    </motion.div>
                </div>

                {/* 📝 Left Side: Register Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-12">
                    <div className="max-w-md mx-auto">
                        <h3 className="text-4xl font-black text-base-content mb-2">Create Account</h3>
                        <p className="text-base-content/60 mb-6">Join us and manage your orders efficiently.</p>

                        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-3">
                            {/* Name Input */}
                            <div className="form-control">
                                <label className="label font-bold">Full Name</label>
                                <input type="text" {...register('name', { required: true })} className="input input-bordered w-full" placeholder="Soriful Islam" />
                                {errors.name && <span className="text-error text-sm">Name is required</span>}
                            </div>

                            {/* Photo Upload */}
                            <div className="form-control">
                                <label className="label font-bold">Profile Photo</label>
                                <input type="file" {...register('photo', { required: true })} className="file-input file-input-bordered file-input-primary w-full" />
                                {errors.photo && <span className="text-error text-sm">Photo is required</span>}
                            </div>

                            {/* Email Input */}
                            <div className="form-control">
                                <label className="label font-bold">Email Address</label>
                                <input type="email" {...register('email', { required: true })} className="input input-bordered w-full" placeholder="email@garments.com" />
                                {errors.email && <span className="text-error text-sm">Email is required</span>}
                            </div>

                            {/* Password Input */}
                            <div className="form-control">
                                <label className="label font-bold">Password</label>
                                <input type="password" {...register('password', { required: true, minLength: 6 })} className="input input-bordered w-full" placeholder="••••••••" />
                                {errors.password && <span className="text-error text-sm">At least 6 characters required</span>}
                            </div>

                            {/* Role Selection */}
                            <div className="form-control">
                                <label className="label font-bold">Select Role</label>
                                <select {...register('role', { required: true })} className="select select-bordered w-full">
                                    <option value="buyer">Buyer</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary w-full text-white font-bold uppercase mt-4">
                                Register Now
                            </button>
                        </form>

                        <div className="divider my-6 text-base-content/40">OR</div>
                        
                        <SocialLogin />

                        <p className="text-center mt-6 font-medium">
                            Already have an account? 
                            <Link to="/login" className="text-secondary hover:underline ml-2">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;