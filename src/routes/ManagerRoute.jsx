// src/routes/ManagerRoute.jsx
import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';
import useRole from '../hooks/useRole';
// import Forbidden from '../components/Forbidden/Forbidden';
import { Navigate, useLocation } from 'react-router';
import Forbidden from '../Forbidden/Forbidden';

const ManagerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate state={location.pathname} to="/login" />;
    }

    // Role check: Only allow 'manager' role
    if (role !== 'manager') {
        return <Forbidden />;
    }

    return children;
};

export default ManagerRoute;