import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './404.scss';

const NoMatch = () => {
	let location = useLocation();
	return (
		<main className="container-404">
			<h1>404</h1>
			<h3>The Page {location.pathname} Was Not Found</h3>
			<p>
				Please go back to the <Link to="/">main page</Link>.
			</p>
		</main>
	);
};

export default NoMatch;
