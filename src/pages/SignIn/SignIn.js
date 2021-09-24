import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	SignInBtn,
	FormInputLable,
	FormBtn,
} from '../../components/small components/SmallComponents';
import { signInWithGoogle, auth } from '../../firebase/firebaseUtility';
import './signIn.scss';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const resetForm = () => {
		setEmail('');
		setPassword('');
	};

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await auth.signInWithEmailAndPassword(email, password);
			resetForm();
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<main className="sign-in-wraper">
			<h1>Sign In</h1>
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
					idFor="current-password"
					idType="password"
					labelText="Password"
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="current-password"
					value={password}
					labelClass={password !== '' ? 'label-up' : null}
				/>
				<FormBtn type="submit" onClick={handleSubmit}>
					Sign In
				</FormBtn>
			</form>
			<h3>Or Sing In Using</h3>
			<div className="other-logIn">
				<SignInBtn icon="fab fa-google" onClick={signInWithGoogle} />
				<SignInBtn icon="fab fa-twitter" />
				<SignInBtn icon="fab fa-facebook" />
			</div>
			<div className="new-customer">
				<h3>New Customer?</h3>
				<p>Click in the button below and create an account</p>

				<Link className="create-btn" to="/sign-up">
					Create Account
				</Link>
			</div>
		</main>
	);
};

export default SignIn;
