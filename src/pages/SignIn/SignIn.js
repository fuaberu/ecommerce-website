import React from 'react';
import {
	SignInBtn,
	FormInputLable,
	SubmitBtn,
} from '../../components/small components/SmallComponents';
import { Link } from 'react-router-dom';

const SignIn = () => {
	return (
		<div className='main'>
			<h1>Sign In</h1>
			<form action="">
				<FormInputLable
					idFor="email"
					idType="email"
					labelText="Email Address"
				/>
				<FormInputLable
					idFor="password"
					idType="password"
					labelText="Password"
				/>
				<SubmitBtn type="submit">Sign In</SubmitBtn>
			</form>
			<h3>Or Sing In Using</h3>
			<div className="other-logIn">
				<SignInBtn icon="google" />
				<SignInBtn icon="twitter" />
				<SignInBtn icon="facebook" />
			</div>
			<div className="new-customer">
				<h3>New Customer?</h3>
				<p>Please click on the button bellow to create an account</p>

				<Link to="/sign-up">Create Account</Link>
			</div>
		</div>
	);
};

export default SignIn;
