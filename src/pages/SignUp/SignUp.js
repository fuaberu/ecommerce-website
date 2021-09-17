import React, { useState } from 'react';
import {
	FormInputLable,
	FormBtn,
} from '../../components/small components/SmallComponents';
import { auth, handleUserProfile } from '../../firebase/firebaseUtility';
import './signUp.scss';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const resetForm = () => {
		setEmail('');
		setPassword('');
		setConfirmPassword('');
		setFirstName('');
		setLastName('');
	};

	async function handleSubmit(e) {
		e.preventDefault();
		if (password !== confirmPassword) return
		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			await handleUserProfile(user, `${firstName} ${lastName}`);
			resetForm();
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className="sign-un-wraper">
			<h1>New Account</h1>
			<form action="" onSubmit={handleSubmit}>
				<FormInputLable
					idFor="email"
					idType="email"
					labelText="Email Address"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					labelClass={email !== '' ? 'label-up' : null}
				/>
				<FormInputLable
					idFor="password"
					idType="password"
					labelText="Password"
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="new-password"
					value={password}
					labelClass={password !== '' ? 'label-up' : null}
				/>
				<FormInputLable
					idFor="confirmPassword"
					idType="password"
					labelText="Confirm Password"
					onChange={(e) => setConfirmPassword(e.target.value)}
					value={confirmPassword}
					labelClass={confirmPassword !== '' ? 'label-up' : null}
				/>
				<FormInputLable
					idFor="firstName"
					idType="text"
					labelText="First Name"
					onChange={(e) => setFirstName(e.target.value)}
					value={firstName}
					labelClass={firstName !== '' ? 'label-up' : null}
				/>
				<FormInputLable
					idFor="lastName"
					idType="text"
					labelText="Last Name"
					onChange={(e) => setLastName(e.target.value)}
					value={lastName}
					labelClass={lastName !== '' ? 'label-up' : null}
				/>
				<FormBtn type="submit">Create Account</FormBtn>
			</form>
		</div>
	);
};

export default SignUp;
