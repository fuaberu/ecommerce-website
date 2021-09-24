import React from 'react';

const Homepage = (props) => {
	return (
		<main>
			<h1>Homepage</h1>
			{props.children}
		</main>
	);
};

export default Homepage;
