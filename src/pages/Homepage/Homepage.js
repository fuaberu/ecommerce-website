import React from 'react';
import background from '../../assets/homepage-background.jpg';
import { LinkBtn } from '../../components/small components/SmallComponents';
import './homepage.scss';

const Homepage = (props) => {
	return (
		<main
			className="homepage"
			style={{ backgroundImage: `url(${background})` }}
		>
			<h1>Fake Store</h1>
			<LinkBtn to="/products" text="Shop Now" />
		</main>
	);
};

export default Homepage;
