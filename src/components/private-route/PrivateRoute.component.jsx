import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
	const loggedIn = true;

	loggedIn ? <Outlet /> : <Navigate to='/auth' />;
};

export default PrivateRoute;
