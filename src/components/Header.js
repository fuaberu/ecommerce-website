import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebaseUtility';
import './header.scss';

const Header = (props) => {
	return (
		<header>
			<nav className="navbar">
				<ul className="navbar-nav">
					<NavItem icon={<i className="fas fa-bars"></i>}>
						<DropdownMenu classType="dropdown">
							<NavItem text="Products" to="/products" />
							{!props.currentUser && <NavItem text="Sign In" to="/sign-in" />}
							{!props.currentUser && <NavItem text="Sign Up" to="/sign-up" />}
							{props.currentUser && (
								<NavItem text="Sign Out" onClick={() => auth.signOut()} />
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
					<NavItem text="Fake Store" to="/" />
					<NavItem icon={<i className="fas fa-shopping-cart"></i>} to="/cart" />
					<p className="logged-in">hello: nhuwndncnsi</p>
				</ul>
			</nav>
		</header>
	);
};

const NavItem = ({ to, text, icon, children, ...otherProps }) => {
	const [open, setOpen] = useState(false);

	return (
		<li className="nav-item" {...otherProps}>
			{to ? (
				<Link to={to}>
					<span>{text}</span>
				</Link>
			) : (
				<span>{text}</span>
			)}
			<span className="icon-button" onClick={() => setOpen(!open)}>
				{icon}
			</span>
			{open && children}
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
