import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../react-redux/hooks/reduxHooks';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const { user } = useAppSelector(state => state);
    const { isLogin, decodedData } = user;
    const userRole = decodedData?.role;

    if (!isLogin) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return <Outlet/>;
};

export default PrivateRoute;
