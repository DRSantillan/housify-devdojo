import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import visibilityIcon from '../../assets/svg/visibilityIcon.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/svg/keyboardArrowRightIcon.svg';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { toast } from 'react-toastify';
import GoogleOAuth from '../../components/google-oauth/GoogleOauth.component';

const UserRegistration = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const { name, email, password } = formData;
	const navigate = useNavigate();
	//
	const onFormSubmit = async event => {
		event.preventDefault();
		try {
			const auth = getAuth();
			const userCredentials = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = await userCredentials.user;
			updateProfile(auth.currentUser, {
				displayName: name,
			});

			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timeStamp = serverTimestamp();

			// add authenticated use with uid to collection of users uid.
			await setDoc(doc(db, 'users', `${user.uid}`), formDataCopy);
			toast.success(
				'Thank you for becoming a member of Housify! Now lets find you a home...',
				{ theme: 'colored' }
			);
			navigate('/');
		} catch (error) {
			toast.error(
				'Oooops Something must have gone wrong, Please try to register again!',
				{
					theme: 'colored',
				}
			);
		}
	};
	const onInputChange = event => {
		setFormData(prevState => ({
			...prevState,
			[event.target.id]: event.target.value,
		}));
	};
	return (
		<div className='pageContainer'>
			<header>
				<p className='pageHeader'>New User Registration</p>
			</header>

			<form onSubmit={onFormSubmit}>
				<input
					type='text'
					className='nameInput'
					id='name'
					placeholder='Enter your full name...'
					value={name}
					onChange={onInputChange}
				/>
				<input
					type='email'
					id='email'
					className='emailInput'
					placeholder='Enter an email address...'
					value={email}
					onChange={onInputChange}
				/>
				<div className='passwordInputDiv'>
					<input
						type={showPassword ? 'text' : 'password'}
						id='password'
						className='passwordInput'
						placeholder='Enter a unique password...'
						value={password}
						onChange={onInputChange}
					/>
					<img
						src={visibilityIcon}
						alt='Show Password'
						className='showPassword'
						onClick={() => setShowPassword(prevState => !prevState)}
					/>
				</div>
				<Link to='/password' className='forgotPasswordLink'>
					Forgot Password?
				</Link>
				<div className='signUpBar'>
					<p className='signUpText'>Register</p>
					<button className='signUpButton'>
						<ArrowRightIcon
							fill='#ffffff'
							width='34px'
							height='34px'
						/>
					</button>
				</div>
			</form>
			<GoogleOAuth />
			<Link to='/auth' className='registerLink'>
				Sign In Instead
			</Link>
		</div>
	);
};

export default UserRegistration;
