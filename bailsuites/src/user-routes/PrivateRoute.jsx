import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_HASH);
    const log = localStorage.getItem(process.env.REACT_APP_LOG_HASH);

    if (!token || !log) {
        toast.error("please login first !!!");
        return <Navigate to="/login" replace />;
    } else {
        return children;
    }
};

export default ProtectedRoute;