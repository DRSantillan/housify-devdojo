import React from 'react';
import { Link } from 'react-router-dom';
import RentCategoryImage from '../../assets/jpg/rentCategoryImage.jpg';
import SellCategoryImage from '../../assets/jpg/sellCategoryImage.jpg';
import Slider from '../../components/slider/Slider.component';

const Explorer = () => {
	return (
		<div className='explore'>
			<header>
				<p className='pageHeader'>Explorer</p>
			</header>
			<main>
				<Slider />
				<p className='exploreCategoryHeading'>Categories</p>
				<div className='exploreCategories'>
					<Link to='/category/rent'>
						<img
							src={RentCategoryImage}
							alt='Category: Rentals'
							className='exploreCategoryImg'
						/>
						<p className='exploreCategoryName'>Rentals</p>
					</Link>
					<Link to='/category/sale'>
						<img
							src={SellCategoryImage}
							alt='Category: Sales'
							className='exploreCategoryImg'
						/>
						<p className='exploreCategoryName'>Sales</p>
					</Link>
				</div>
			</main>
		</div>
	);
};

export default Explorer;
