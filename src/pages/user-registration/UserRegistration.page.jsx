import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import visibilityIcon from '../../assets/svg/visibilityIcon.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/svg/keyboardArrowRightIcon.svg';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import {
	serverTimestamp,
	collection,
	addDoc,
	setDoc,
	doc,
	getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

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
			await setDoc(doc(db, 'users', `${user.uid}`), formDataCopy)
			

			navigate('/');
		} catch (error) {
			console.log(error);
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
			{/*oauth google */}
			<Link to='/auth' className='registerLink'>
				Sign In Instead
			</Link>
		</div>
	);
};

export default UserRegistration;
