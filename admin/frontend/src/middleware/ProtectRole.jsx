import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import storeContext from '../context/storeContext';

const ProtectRole = ({ role }) => {
    const { store } = useContext(storeContext);

    if (!store.userInfo) {
        // Jika belum login, redirect ke halaman login atau unable-access
        return <Navigate to="/dashboard/unable-access" />;
    }

    if (store.userInfo.role === role) {
        return <Outlet />;
    } else if (store.userInfo.role === 'admin') {
        return <Navigate to="/dashboard/admin" />;
    } else if (store.userInfo.role === 'writer') {
        return <Navigate to="/dashboard/writer" />;
    } else if (store.userInfo.role === 'user') {
        return <Navigate to="/dashboard/profile" />;
    } else {
        return <Navigate to="/dashboard/unable-access" />;
    }
};

export default ProtectRole;