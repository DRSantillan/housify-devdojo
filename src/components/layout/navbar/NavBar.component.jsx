import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as OfferIcon } from '../../../assets/svg/localOfferIcon.svg';
import { ReactComponent as ExplorerIcon } from '../../../assets/svg/exploreIcon.svg';
import { ReactComponent as PersonalIcon } from '../../../assets/svg/personOutlineIcon.svg';

const NavBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	//
	const pathMatchRoute = route => {
		if (route === location.pathname) return true;
	};
	//
	const showActiveLinkColor = (route, type) => {
		switch (route) {
			case '/':
				if (pathMatchRoute('/')) return '#00a6ff';
				break;
			case '/offers':
				if (pathMatchRoute('/offers')) return '#3ed000';
				break;
			case '/profile':
				if (pathMatchRoute('/profile')) return '#ff3c00';
				break;
			default:
				return '#8f8f8f';
		}
	};
	return (
		<footer className='navbar'>
			<nav className='navbarNav'>
				<ul className='navbarListItems'>
					<li
						className='navbarListItem'
						onClick={() => navigate('/')}
					>
						<ExplorerIcon
							fill={showActiveLinkColor('/')}
							width='36px'
							height='36px'
						/>
						<p style={{ color: showActiveLinkColor('/') }}>
							Explore
						</p>
					</li>
					<li
						className='navbarListItem'
						onClick={() => navigate('/offers')}
					>
						<OfferIcon
							fill={showActiveLinkColor('/offers')}
							width='36px'
							height='36px'
						/>
						<p style={{ color: showActiveLinkColor('/offers') }}>
							Offers
						</p>
					</li>
					<li
						className='navbarListItem'
						onClick={() => navigate('/profile')}
					>
						<PersonalIcon
							fill={showActiveLinkColor('/profile')}
							width='36px'
							height='36px'
						/>
						<p style={{ color: showActiveLinkColor('/profile') }}>
							Profile
						</p>
					</li>
				</ul>
			</nav>
		</footer>
	);
};

export default NavBar;
