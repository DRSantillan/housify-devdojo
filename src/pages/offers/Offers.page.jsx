import { useEffect, useState } from 'react';

import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	//startAfter,
	where,
} from 'firebase/firestore';
//import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Spinner from '../../components/spinner/Spinner.component';
import { db } from '../../firebase/firebase.config';
import ListingItem from '../../components/listing-item/ListingItem.component';

const Offers = () => {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);

	

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const listingRef = collection(db, 'listing');

				const q = query(
					listingRef,
					where('offer', '==', true),
					orderBy('timestamp', 'desc'),
					limit(10)
				);

				const querySnapShot = await getDocs(q);
				
				const categoryListings = [];

				querySnapShot.forEach(doc => {
					return categoryListings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setListings(categoryListings);
				setLoading(false);
			} catch (error) {
				toast.error('Could not retrieve the listings you requested!');
			}
		};

		fetchListings();
	}, []);
	return (
		<div className='category'>
			<header>
				<p className='pageHeader'>
					Offers
				</p>
			</header>
			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<ul className='categoryListings'>
							{listings.map(listing => (
								<ListingItem
									key={listing.id}
									id={listing.id}
									listing={listing.data}
								/>
							))}
						</ul>
					</main>
				</>
			) : (
				<p>Currently, there are no offers available.</p>
			)}
		</div>
	);
};

export default Offers;
