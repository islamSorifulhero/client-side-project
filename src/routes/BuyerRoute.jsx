// src/Routes/BuyerRoute.jsx
import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";
import Forbidden from "../Forbidden/Forbidden";

const BuyerRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) return <Loading />;

    if (role !== "buyer") return <Forbidden />;

    return children;
};

export default BuyerRoute;
