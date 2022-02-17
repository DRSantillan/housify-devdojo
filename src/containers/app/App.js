import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Offers from '../../pages/offers/Offers.page';
import Explorer from '../../pages/explorer/Explorer.page';
import UserProfile from '../../pages/user-profile/UserProfile.page';
import ForgotPassword from '../../pages/password/ForgotPassword.page';
import UserAuthentication from '../../pages/user-authentication/UserAuthentication.page';
import UserRegistration from '../../pages/user-registration/UserRegistration.page';

import NavBar from '../../components/layout/navbar/NavBar.component';
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Explorer />} />
					<Route path='/offers' element={<Offers />} />
					<Route path='/profile' element={<UserProfile />} />
					<Route path='/auth' element={<UserAuthentication />} />
					<Route
						exact
						path='/register'
						element={<UserRegistration />}
					/>
					<Route path='/password' element={<ForgotPassword />} />
				</Routes>
				<NavBar />
			</Router>
			<ToastContainer position='bottom-center' autoClose={3000} theme='colored' />
		</>
	);
}

export default App;
