import React, { useState, useContext } from 'react';
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
	return (
		<header>
			<nav className="navbar">
				<ul className="navbar-nav">
					<NavItem
						icon={<i className="fas fa-bars"></i>}
						open={open}
						onClick={() => handleMenu()}
					>
						<DropdownMenu classType="dropdown">
							<NavItemLink text="Products" to="/products" />
							{!userData && <NavItemLink text="Sign In" to="/sign-in" />}
							{!userData && <NavItemLink text="Sign Up" to="/sign-up" />}
							{userData && (
								<NavItemLink text="Sign Out" to="/" onClick={signOut} />
							)}
							<NavItem text="Language" icon={<i className="fas fa-globe"></i>}>
								<DropdownMenu classType="open-over">
									<DropDownItem>English</DropDownItem>
									<DropDownItem>Japanse</DropDownItem>
									<DropDownItem>Portuguese</DropDownItem>
								</DropdownMenu>
							</NavItem>
						</DropdownMenu>
					</NavItem>
					<NavItemLink text="Fake Store" to="/" />
					<NavItemLink
						icon={<i className="fas fa-shopping-cart"></i>}
						to="/cart"
						text={totalItems ? `(${totalItems})` : null}
					/>
					{userData && (
						<p className="logged-in">Wellcome: {userData.displayName}</p>
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

const DropDownItem = (props) => {
	return (
		<span href="#" className="menu-item">
			{props.children}
		</span>
	);
};
export default Header;
