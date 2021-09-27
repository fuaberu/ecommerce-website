import React, { useState, useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userInfo } from '../../App';
import { myCart } from '../../App';
import { auth } from '../../firebase/firebaseUtility';
import './header.scss';

const Header = () => {
	const [open, setOpen] = useState(false);
	const userData = useContext(userInfo);
	const totalItems = useContext(myCart).totalItems;

	const handleMenu = () => {
		setOpen(!open);
	};

	const signOut = async () => {
		try {
			await auth.signOut();
		} catch (error) {
			console.log(error);
		}
	};

	const changeHeader = () => {
		if (window.innerWidth > 700) {
			setOpen(true)
		}
	}

	useEffect(() => {
		changeHeader();
	});

	return (
		<header>
			<nav className="navbar">
				<ul className="navbar-nav">
					<NavItem
						icon={<i className="fas fa-bars"></i>}
						open={open}
						onClick={() => handleMenu()}
						id='burger-menu'
					>
						<DropdownMenu classType="dropdown">
							<NavItemLink text="Products" to="/products" />
							{!userData && <NavItemLink text="Sign In" to="/sign-in" />}
							{!userData && <NavItemLink text="Sign Up" to="/sign-up" />}
							{userData && (
								<NavItemLink text="Sign Out" to="/" onClick={signOut} />
							)}
						</DropdownMenu>
					</NavItem>
					<NavItemLink
						text="Fake Store"
						to="/"
						onClick={() => setOpen(false)}
						id='store-name'
					/>
					<NavItemLink
						icon={<i className="fas fa-shopping-cart"></i>}
						to="/cart"
						text={totalItems ? `(${totalItems})` : null}
						onClick={() => setOpen(false)}
						id='shop-link'
					/>
					{userData && (
						<p className="logged-in">Welcome: {userData.displayName}</p>
					)}
				</ul>
			</nav>
		</header>
	);
};

const NavItem = ({ text, icon, children, open, ...otherProps }) => {
	return (
		<li className="nav-item" {...otherProps}>
			<span>{text}</span>

			<span className="icon-button">{icon}</span>
			{open && children}
		</li>
	);
};

const NavItemLink = ({ to, text, icon, ...otherProps }) => {
	return (
		<li className="nav-item" {...otherProps}>
			<Link to={to}>
				<span className="icon-button">{icon}</span>
				<span>{text}</span>
			</Link>
		</li>
	);
};

const DropdownMenu = (props) => {
	return <ul className={props.classType}>{props.children}</ul>;
};

export default Header;
