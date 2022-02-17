import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Offers from '../../pages/offers/Offers.page';
import Explorer from '../../pages/explorer/Explorer.page';
import UserProfile from '../../pages/user-profile/UserProfile.page';
import ForgotPassword from '../../pages/password/ForgotPassword.page';
import UserAuthentication from '../../pages/user-authentication/UserAuthentication.page';
import UserRegistration from '../../pages/user-registration/UserRegistration.page';

import NavBar from '../../components/layout/navbar/NavBar.component';

function App() {
	return (
		<>
			<Router>
				<Routes>

					<Route path='/' element={<Explorer />} />
					<Route path='/offers' element={<Offers />} />
					<Route path='/profile' element={<UserProfile />} />
					<Route
						path='/auth'
						element={<UserAuthentication />}
					/>
					<Route
						exact path='/register'
						element={<UserRegistration />}
					/>
					<Route
						path='/password'
						element={<ForgotPassword />}
					/>
				</Routes>
				<NavBar/>
			</Router>
		</>
	);
}

export default App;
