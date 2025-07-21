import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuthRedux} from '@/hooks';

/**
 * PrivateRoute component for protecting routes that require authentication
 * Redirects to home page if user is not authenticated
 */
const PrivateRoute = () => {
    const {isAuthenticated} = useAuthRedux();

    // If user is not authenticated, redirect to home page
    if (!isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    // If user is authenticated, render the child routes
    return <Outlet/>;
};

export default PrivateRoute;
