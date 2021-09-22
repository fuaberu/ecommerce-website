import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { myCart } from '../../App';
import ProductList from '../../components/productList/ProductList';
import './cart.scss';

const Cart = () => {
	const [total, setTotal] = useState(0);

	const itemsCount = useContext(myCart).totalItems;
	const cartItems = useContext(myCart).value;

	const calcTotalPrice = () => {
		setTotal(0);
		Object.keys(cartItems).forEach((key) => {
			setTotal((prev) => prev + cartItems[key].quantity * cartItems[key].price);
		});
	};
	useEffect(() => {
		calcTotalPrice();
	}, [cartItems]);

	return (
		<main className="cart-container">
			<h1>Your cart</h1>
			<div className="flex">
				<div>
					<p>
						{itemsCount > 1 || itemsCount === 0
							? `total: (${itemsCount} items)`
							: `total: (${itemsCount} item)`}
					</p>
					<p>{`$${total.toFixed(2)}`}</p>
				</div>
				<Link className="cart-btn" to="/checkout">
					Checkout
				</Link>
			</div>
			<div className="items">
				{Object.keys(cartItems).map((key) => {
					return (
						<ProductList
							image={cartItems[key].image}
							alt={cartItems[key].alt}
							displayName={cartItems[key].displayName}
							price={cartItems[key].price}
							quantity={cartItems[key].quantity}
							key={cartItems[key].uid}
                        />
                        
					);
				})}
			</div>
			<Link className="cart-btn" to="/products">
				continue shopping
			</Link>
		</main>
	);
};

export default Cart;
