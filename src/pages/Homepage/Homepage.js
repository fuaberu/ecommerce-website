import React from 'react';

const Homepage = (props) => {
	return (
		<div>
			<h1>Homepage</h1>
			{props.children}
		</div>
	);
};

export default Homepage;
