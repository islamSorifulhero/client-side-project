import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(async (config) => {

            // FIX: Firebase user must give latest idToken
            if (user) {
                const idToken = await user.getIdToken();
                config.headers.Authorization = `Bearer ${idToken}`;
            }

            return config;
        })

        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                console.log(error);

                const status = error?.response?.status;

                if (status === 401 || status === 403) {
                    logOut().then(() => navigate('/login'));
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };

    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
