import React from 'react';
import './spinner.scss';

const Spinner = ({ position }) => {
	return (
		<div className="spinner-container">
			<div className={position ? `${position} spinner` : 'spinner'}>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Spinner;
