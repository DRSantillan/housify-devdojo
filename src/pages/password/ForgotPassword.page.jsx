import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../../assets/svg/keyboardArrowRightIcon.svg';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const onChange = event => setEmail(event.target.value);
	const navigate = useNavigate();

	const onSubmit = async event => {
		event.preventDefault();
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			toast.success('An email was sent to the specified account.', {
				theme: 'colored',
			});
			navigate('/auth');
		} catch (error) {
			toast.error('Ooops something went wrong! Try Again!', {
				theme: 'colored',
			});
		}
	};
	return (
		<div className='pageContainer'>
			<header>
				<p className='pageHeader'>Forgot Your Password</p>
			</header>
			<main>
				<form onSubmit={onSubmit}>
					<input
						type='text'
						placeholder='Enter your email to retrieve your password...'
						id='email'
						value={email}
						onChange={onChange}
						className='emailInput'
					/>
					<Link className='forgotPasswordLink' to='/auth'>
						Sign In
					</Link>
					<div className='signInBar'>
						<div className='signInText'>Send Reset Link</div>
						<button className='signInButton'>
							<ArrowRightIcon
								fill='#fff'
								width='34px'
								height='34px'
							/>
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default ForgotPassword;
