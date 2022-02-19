import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from '../../components/spinner/Spinner.component';
import 'swiper/css/bundle';

const Slider = () => {
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const getListings = async () => {
			const listingsRef = collection(db, 'listing');
			const q = query(
				listingsRef,
				orderBy('timestamp', 'desc'),
				limit(5)
			);
			const querySnap = await getDocs(q);

			let listings = [];

			querySnap.forEach(doc => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});

			setListings(listings);
			setLoading(false);
		};

		getListings();
	}, []);

	if (loading) {
		return <Spinner />;
	}

	if (listings.length === 0) {
		return <></>;
	}
	return (
		listings && (
			<>
				<p className='exploreHeading'>Recommended</p>

				<Swiper
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					slidesPerView={1}
					
					pagination={{ clickable: true }}
					scrollbar={{ draggable: true }}
				>
					{listings.map(({ data, id }) => (
						<SwiperSlide
							key={id}
							onClick={() =>
								navigate(`/category/${data.type}/${id}`)
							}
						>
							<div
								style={{
									background: `url(${data.imageUrls[0]}) center no-repeat`,
									backgroundSize: 'cover',
									objectFit: 'contain',
									height: '80vh',
								}}
								className='swiperSlideDiv'
							>
								<p className='swiperSlideText'>{data.name}</p>
								<p className='swiperSlidePrice'>
									${data.discountedPrice ?? data.regularPrice}{' '}
									{data.type === 'rent' && '/ month'}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</>
		)
	);
};

export default Slider;
