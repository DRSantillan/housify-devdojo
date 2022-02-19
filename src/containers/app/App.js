import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from '../../components/layout/navbar/NavBar.component';
import PrivateRoute
  from '../../components/private-route/PrivateRoute.component';
import Category from '../../pages/categories/Category.page';
import CreateListing from '../../pages/create-listing/CreateListing.page';
import Explorer from '../../pages/explorer/Explorer.page';
import Offers from '../../pages/offers/Offers.page';
import ForgotPassword from '../../pages/password/ForgotPassword.page';
import UserAuthentication
  from '../../pages/user-authentication/UserAuthentication.page';
import UserProfile from '../../pages/user-profile/UserProfile.page';
import UserRegistration
  from '../../pages/user-registration/UserRegistration.page';
  import AdvertisedListing from '../../pages/listing/Listing.page';


function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Explorer />} />
					<Route path='/offers' element={<Offers />} />
					<Route
						path='/category/:categoryName'
						element={<Category />}
					/>
					<Route path='/create-listing' element={<CreateListing />} />
					<Route path='/category/:categoryName/:listingId' element={<AdvertisedListing />} />
					<Route path='/profile' element={<PrivateRoute />}>
						<Route path='/profile' element={<UserProfile />} />
					</Route>
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
			<ToastContainer
				position='bottom-center'
				autoClose={3000}
				theme='colored'
			/>
		</>
	);
}

export default App;
