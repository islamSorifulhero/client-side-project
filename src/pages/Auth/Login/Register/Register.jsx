import React from 'react';
import { useForm } from 'react-hook-form';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link, useLocation, useNavigate } from 'react-router';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {
        const profileImg = data.photo[0];

        // Password validation: uppercase, lowercase, min 6
        const passRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (!passRegex.test(data.password)) {
            toast.error('Password must contain uppercase, lowercase & at least 6 characters');
            return;
        }

        registerUser(data.email, data.password)
            .then(() => {
                // Upload image to imgbb
                const formData = new FormData();
                formData.append('image', profileImg);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // Update Firebase profile
                        updateUserProfile({ displayName: data.name, photoURL })
                            .then(() => {
                                // Save user in backend DB
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
        <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl mt-20">
            <h3 className="text-3xl text-center font-bold mb-4">Please Register</h3>
            <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
                <label className="label">Name</label>
                <input type="text" {...register('name', { required: true })} className="input input-bordered w-full" placeholder="Your Name" />
                {errors.name && <p className='text-red-500'>Name is required</p>}

                <label className="label">Photo</label>
                <input type="file" {...register('photo', { required: true })} className="file-input w-full" />
                {errors.photo && <p className='text-red-500'>Photo is required</p>}

                <label className="label">Email</label>
                <input type="email" {...register('email', { required: true })} className="input input-bordered w-full" placeholder="Email" />
                {errors.email && <p className='text-red-500'>Email is required</p>}

                <label className="label">Password</label>
                <input type="password"
                    {...register('password', { required: true, minLength: 6 })}
                    className="input input-bordered w-full"
                    placeholder="Password"
                />
                {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 characters</p>}

                <label className="label">Role</label>
                <select {...register('role', { required: true })} className="select select-bordered w-full">
                    <option value="buyer">Buyer</option>
                    <option value="manager">Manager</option>
                </select>

                <button type="submit" className="btn btn-primary mt-4 w-full">Register</button>
            </form>

            <p className='text-center mt-4'>Already have an account?
                <Link className='text-blue-400 underline ml-1' to="/login">Login</Link>
            </p>

            <div className="mt-4">
                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;
