import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            This is AuthLayout
            <Outlet/>
        </div>
    );
};

export default AuthLayout;