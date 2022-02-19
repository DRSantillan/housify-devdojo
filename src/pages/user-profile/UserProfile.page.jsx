import React, { useState, useEffect } from 'react';

import { getAuth, updateProfile } from 'firebase/auth';
import {
	updateDoc,
	doc,
	collection,
	getDocs,
	query,
	where,
	orderBy,
	deleteDoc,
} from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ArrowRightIcon from '../../assets/svg/keyboardArrowRightIcon.svg';
import HomeIcon from '../../assets/svg/homeIcon.svg';
import { db } from '../../firebase/firebase.config';
import ListingItem from '../../components/listing-item/ListingItem.component'

const UserProfile = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	//state
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState(null);
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

	useEffect(() => {
		const getUserListings = async () => {
			const listingsRef = collection(db, 'listing');
			const q = query(
				listingsRef,
				where('userRef', '==', auth.currentUser.uid),
				orderBy('timestamp', 'desc')
			);

			const querySnapShot = await getDocs(q);
			let listings = [];
			querySnapShot.forEach(doc => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings(listings)
			setLoading(false)
		};

		getUserListings();
	}, [auth.currentUser.uid]);

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

	const onDelete = async listingId => {
		if (window.confirm('Are you sure you want to delete?')) {
			await deleteDoc(doc(db, 'listing', listingId));
			const updatedListings = listings.filter(
				listing => listing.id !== listingId
			);
			setListings(updatedListings);
			toast.success('Successfully deleted listing');
		}
	};

	const onEdit = listingId => navigate(`/edit-listing/${listingId}`);
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
				<Link to='/create-listing' className='createListing'>
					<img src={HomeIcon} alt='Home' />
					<p>Sell or Rent your home or apartment</p>
					<img
						src={ArrowRightIcon}
						alt='Click here to sell or rent...'
					/>
				</Link>
				{!loading && listings?.length > 0 && (
					<>
						<p className='listingText'>Your Listings</p>
						<ul className='listingsList'>
							{listings.map(listing => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
									onDelete={() => onDelete(listing.id)}
									onEdit={() => onEdit(listing.id)}
								/>
							))}
						</ul>
					</>
				)}
			</main>
		</div>
	);
};

export default UserProfile;
