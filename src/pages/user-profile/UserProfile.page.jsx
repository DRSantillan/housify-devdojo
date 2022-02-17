import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

const UserProfile = () => {
	const auth = getAuth();
	const [user, setUser] = useState();

	useEffect(() => {
		console.log(auth.currentUser);
		setUser(auth.currentUser);
	}, []);
	return user ? <h1>{user.displayName}</h1> : <h2>Not Logged In</h2>;
};

export default UserProfile;
