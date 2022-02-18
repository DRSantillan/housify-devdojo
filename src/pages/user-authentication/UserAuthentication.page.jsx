import React, { useState } from 'react';

import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  ReactComponent as ArrowRightIcon,
} from '../../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../../assets/svg/visibilityIcon.svg';
import GoogleOAuth from '../../components/google-oauth/GoogleOauth.component';

const UserAuthentication = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({ email: '', password: '' });
	const { email, password } = formData;
	const navigate = useNavigate();

	const onInputChange = event => {
		setFormData(prevState => ({
			...prevState,
			[event.target.id]: event.target.value,
		}));
	};
	const onFormSubmit = async event => {
		event.preventDefault();

		try {
			const auth = getAuth();
			const userCredentials = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			if (userCredentials.user) {
				toast.success('Welcome back', { theme: 'colored' });
				navigate('/');
			}
		} catch (error) {
			toast.error('Bad User Credentials, try again!', {
				theme: 'colored',
			});
		}
	};
	return (
		<>
			<div className='pageContainer'>
				<header>
					<p className='pageHeader'>Welcome back!</p>
				</header>
				<form onSubmit={onFormSubmit}>
					<input
						type='email'
						id='email'
						className='emailInput'
						placeholder='Enter your email address...'
						value={email}
						onChange={onInputChange}
					/>
					<div className='passwordInputDiv'>
						<input
							type={showPassword ? 'text' : 'password'}
							className='passwordInput'
							placeholder='Enter your password...'
							id='password'
							value={password}
							onChange={onInputChange}
						/>
						<img
							src={visibilityIcon}
							alt='Show Password'
							className='showPassword'
							onClick={() =>
								setShowPassword(prevState => !prevState)
							}
						/>
					</div>
					<Link to='/password' className='forgotPasswordLink'>
						Forgot password?
					</Link>
					<div className='signInBar'>
						<p className='signInText'>Sign In</p>
						<button className='signInButton'>
							<ArrowRightIcon
								fill='#ffff'
								width='36px'
								height='36px'
							/>
						</button>
					</div>
				</form>
				<GoogleOAuth />
				<Link to='/register' className='registerLink'>
					New User Registration
				</Link>
			</div>
		</>
	);
};

export default UserAuthentication;
