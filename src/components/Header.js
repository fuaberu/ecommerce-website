import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
	return (
		<header>
			<nav className="navbar">
				<ul className="navbar-nav">
					<NavItem icon={<i className="fas fa-bars"></i>}>
						<DropdownMenu classType="dropdown">
							<NavItem text="Products" to="/products" />
							<NavItem text="Sign in" to="/sign-in" />
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
				</ul>
			</nav>
		</header>
	);
};

const NavItem = (props) => {
	const [open, setOpen] = useState(false);

	return (
		<li className="nav-item">
			<Link to={props.to}>
				<span>{props.text}</span>
			</Link>
			<a className="icon-button" href="#" onClick={() => setOpen(!open)}>
				{props.icon}
			</a>
			{open && props.children}
		</li>
	);
};

const DropdownMenu = (props) => {
	return <ul className={props.classType}>{props.children}</ul>;
};

const DropDownItem = (props) => {
	return (
		<a href="#" className="menu-item">
			{props.children}
		</a>
	);
};
export default Header;
