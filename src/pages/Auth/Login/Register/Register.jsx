import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {
                const formData = new FormData();
                formData.append('image', profileImg);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL,
                            role: data.role,
                            status: 'pending'
                        };

                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    toast.success('User created successfully');
                                }
                            });

                        // update Firebase profile
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        };

                        updateUserProfile(userProfile)
                            .then(() => {
                                navigate(location.state || '/');
                            })
                            .catch(error => toast.error(error.message));
                    })
                    .catch(error => toast.error('Image upload failed'));
            })
            .catch(error => toast.error(error.message));
    };

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl">
            <h3 className="text-3xl text-center">Please Register</h3>
            <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
                <label className="label">Name</label>
                <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                {errors.name && <p className='text-red-500'>Name is required.</p>}

                <label className="label">Photo</label>
                <input type="file" {...register('photo', { required: true })} className="file-input" />
                {errors.photo && <p className='text-red-500'>Photo is required.</p>}

                <label className="label">Email</label>
                <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                {errors.email && <p className='text-red-500'>Email is required.</p>}

                <label className="label">Password</label>
                <input type="password"
                    {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                    })}
                    className="input"
                    placeholder="Password"
                />
                {errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>}
                {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>}
                {errors.password?.type === 'pattern' &&
                    <p className='text-red-500'>Password must have uppercase, lowercase, number & special character</p>}

                <label className="label">Role</label>
                <select {...register('role', { required: true })} className="select w-full">
                    <option value="buyer">Buyer</option>
                    <option value="manager">Manager</option>
                </select>

                <button className="btn btn-neutral mt-4">Register</button>
            </form>
            <p className='text-center mt-2'>Already have an account? <Link className='text-blue-400 underline' to="/login">Login</Link></p>
            <SocialLogin />
        </div>
    );
};

export default Register;
