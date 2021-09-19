import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

const Layout = (props) => {
	return (
		<>
            <Header />
			{props.children}
			<Footer />
		</>
	);
};

export default Layout;
