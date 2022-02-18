import React, { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../../firebase/firebase.config';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProfile = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	//state
	const [updateProfileData, setUpdateProfiel] = useState(false);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});
	const { name, email } = formData;

	const userSignOut = () => {
		auth.signOut();
		toast.success('See you later, have a great day!', { theme: 'colored' });
		navigate('/');
	};

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				await updateProfile(auth.currentUser, { displayName: name });
				// update firestore data with new data
				const userRef = doc(db, 'users', auth.currentUser.uid);
				await updateDoc(userRef, { name });
				toast.success('Successfully Updated...', {
					theme: 'colored',
				});
			}
		} catch (error) {
			console.log(error);
			toast.error(
				'Ooops Something went wrong! Please try to update again or wait a few minutes.',
				{
					theme: 'colored',
				}
			);
		}
	};

	const onChangeProfileData = event => {
		setFormData(prevState => ({
			...prevState,
			[event.target.id]: event.target.value,
		}));
	};

	return (
		<div className='profile'>
			<header className='profileHeader'>
				<p className='pageHeader'>My Profile</p>
				<button className='logOut' type='button' onClick={userSignOut}>
					Sign Out
				</button>
			</header>
			<main>
				<div className='profileDetailsHeader'>
					<p className='profileDetailsText'>Personal Details:</p>
					<p
						className='changePersonalDetails'
						onClick={() => {
							updateProfileData && onSubmit();
							setUpdateProfiel(prevState => !prevState);
						}}
					>
						{updateProfileData ? 'done' : 'update'}
					</p>
				</div>
				<div className='profileCard'>
					<form>
						<input
							type='text'
							className={
								!updateProfileData
									? 'profileName'
									: 'profileNameActive'
							}
							id='name'
							value={name}
							disabled={!updateProfileData}
							onChange={onChangeProfileData}
						/>
						<input
							type='text'
							className={
								!updateProfileData
									? 'profileEmail'
									: 'profileEmailActive'
							}
							id='email'
							value={email}
							disabled={!updateProfileData}
							onChange={onChangeProfileData}
						/>
					</form>
				</div>
			</main>
		</div>
	);
};

export default UserProfile;
