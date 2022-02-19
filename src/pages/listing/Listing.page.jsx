import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebase.config';
import Spinner from '../../components/spinner/Spinner.component';
import ShareIcon from '../../assets/svg/shareIcon.svg';

const AdvertisedListing = () => {
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [shareLinkCopied, setShareLinkCopied] = useState(false);

	const navigate = useNavigate();
	const params = useParams();
	const auth = getAuth();

	useEffect(() => {
		const getListing = async () => {
			const docRef = doc(db, 'listing', params.listingId);
			const docSnapShot = await getDoc(docRef);

			if (docSnapShot.exists()) {
				console.log(docSnapShot.data());
				setListing(docSnapShot.data());
				setLoading(false);
			}
		};

		getListing();
	}, [navigate, params.listingId]);

	if (loading) {
		return <Spinner />;
	}
	return (
		<main>
			<div
				className='shareIconDiv'
				onClick={() => {
					navigator.clipboard.writeText(window.location.href);
					setShareLinkCopied(true);
					setTimeout(() => {
						setShareLinkCopied(false);
					}, 2000);
				}}
			>
				<img src={ShareIcon} alt='Share this...' />
			</div>
			{shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}
			<div className='listingDetails'>
				<p className='listingName'>
					{listing.name} - $
					{listing.offer
						? listing.discountedPrice
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						: listing.regularPrice
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
				</p>
				<p className='listingLocation'>{listing.location}</p>
				<p className='listingType'>
					For {listing.type === 'rent' ? 'Rent' : 'Sale'}
				</p>
				{listing.offer && (
					<p className='discountPrice'>
						${listing.regularPrice - listing.discountedPrice}{' '}
						Discount
					</p>
				)}
				<ul className='listingDetailsList'>
					<li>
						{listing.bedrooms > 1
							? `${listing.bedrooms} Bedrooms`
							: '1 Bedroom'}
					</li>
					<li>
						{listing.bathrooms > 1
							? `${listing.bathrooms} Bathrooms`
							: '1 Bathroom'}
					</li>
					<li>
						{listing.parking
							? 'Parking Spot Available.'
							: 'No Parking Spot Available.'}
					</li>
					<li>
						{listing.furnished
							? 'Property is furnished'
							: 'Unfurnished Property'}
					</li>
				</ul>
				<p className='listingLocationTitle'>Location</p>

				{auth.currentUser?.uid !== listing.userRef && (
					<Link
						to={`/contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.location}`}
						className='primaryButton'
					>
						Contact Landlord or Agent
					</Link>
				)}
			</div>
		</main>
	);
};

export default AdvertisedListing;
