import React from 'react';
import './footer.scss'

const Footer = () => {
	return (
		<footer>
			<div className="footer-copyright">
				© {new Date().getFullYear()} build by{' '}
				<a href="https://github.com/fuaberu" target="_blank" rel="noopener noreferrer">Kevin Fabel</a> 
			</div>
		</footer>
	);
};

export default Footer;
