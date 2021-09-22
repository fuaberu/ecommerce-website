import React from 'react';
import './smallComponents.scss';

const SignInBtn = ({ icon, ...otherProps }) => {
	return (
		<button className="sign-in-btn" {...otherProps}>
			<i className={`${icon}`}></i>
		</button>
	);
};

const FormInputLable = ({
	onChange,
	value,
	idFor,
	idType,
	labelText,
	labelClass,
	errMessage,
	...otherProps
}) => {
	return (
		<div className="input-wrap">
			<input
				onChange={onChange}
				value={value}
				id={idFor}
				type={idType}
				name={idFor}
				{...otherProps}
				required
			/>
			<label className={labelClass} htmlFor={idFor}>
				{labelText}
			</label>
			<p className='error-message'>{errMessage}</p>
		</div>
	);
};

const FormBtn = ({ children, type }) => {
	return (
		<button className="submit-btn" type={type}>
			{children}
		</button>
	);
};

export { SignInBtn, FormInputLable, FormBtn };
