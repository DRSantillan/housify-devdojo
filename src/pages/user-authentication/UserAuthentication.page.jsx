import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../../assets/svg/visibilityIcon.svg';
import { getAuth, signInWithEmailAndPassword } from 'firebase/compat/auth';

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
				{/*google oauth */}
				<Link to='/register' className='registerLink'>
					New User Registration
				</Link>
			</div>
		</>
	);
};

export default UserAuthentication;
