import React from 'react';
import './smallComponents.scss';

const SignInBtn = (props) => {
	return (
		<button className="sign-in-btn">
			<i className={`fab fa-${props.icon}`}></i>
		</button>
	);
};

const FormInputLable = (props) => {
	return (
		<div className="input-wrap">
			<input id={props.idFor} type={props.idType} name={props.idFor} required/>
			<label htmlFor={props.idFor}>{props.labelText}</label>
		</div>
	);
};

const SubmitBtn = (props) => {
	return (
		<button className='submit-btn' type={props.type}>
			{props.children}
		</button>
	);
};

export { SignInBtn, FormInputLable, SubmitBtn };
