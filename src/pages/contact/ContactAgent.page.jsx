import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { toast } from 'react-toastify';

const ContactAgent = () => {
	const [message, setMessage] = useState('');
	const [landLord, setLandLord] = useState(null);
	// eslint-disable-next-line
	const [searchParams, setSearchParams] = useSearchParams();
	const params = useParams();

	useEffect(() => {
		const getLandlord = async () => {
			const docRef = doc(db, 'users', params.userId);
			const docSnapShot = await getDoc(docRef);

			if (docSnapShot.exists()) {
				setLandLord(docSnapShot.data());
			} else {
				toast.error(
					'Could not retrieve Agent/Landlord information. Please try again.'
				);
			}
		};

		getLandlord();
	}, [params.userId]);

	const onChange = event => setMessage(event.target.value);

	return (
		<div className='pageContainer'>
			<header>
				<p className='pageHeader'>Contact Agent / Landlord</p>
			</header>

			{landLord !== null && (
				<main>
					<div className='contactLandlord'>
						<p className='landlordName'>Contact {landLord?.name}</p>
					</div>

					<form className='messageForm'>
						<div className='messageDiv'>
							<label htmlFor='message' className='messageLabel'>
								Message
							</label>
							<textarea
								name='message'
								id='message'
								className='textarea'
								value={message}
								onChange={onChange}
							></textarea>
						</div>

						<a
							href={`mailto:${
								landLord.email
							}?Subject=${searchParams.get(
								'listingName'
							)}&body=${message}`}
						>
							<button type='button' className='primaryButton'>
								Send Message
							</button>
						</a>
					</form>
				</main>
			)}
		</div>
	);
};

export default ContactAgent;
