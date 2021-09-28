import React, { useContext, useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Link } from 'react-router-dom';
import { myCart } from '../../App';
import ProductList from '../../components/productList/ProductList';
import './cart.scss';

const Cart = () => {
	const [total, setTotal] = useState(0);

	const itemsCount = useContext(myCart).totalItems;
	const cartItems = useContext(myCart).value;
	const setCart = useContext(myCart).set;

	const calcTotalPrice = () => {
		setTotal(0);
		Object.keys(cartItems).forEach((key) => {
			setTotal((prev) => prev + cartItems[key].quantity * cartItems[key].price);
		});
	};
	useEffect(() => {
		setCartArray();
		calcTotalPrice();
	}, [cartItems]);

	const deleteItem = (uid) => {
		const prevObject = { ...cartItems };
		delete prevObject[uid];
		setCart(prevObject);
	};

	const handleClick = (e) => {
		if (
			cartItems[e.target.dataset.uid].quantity - 1 <= 0 &&
			e.target.id === '-'
		) {
			deleteItem(e.target.dataset.uid);
			return;
		}
		if (e.target.id === '+') {
			setCart({
				...cartItems,
				[e.target.dataset.uid]: {
					...cartItems[e.target.dataset.uid],
					quantity: Math.round(cartItems[e.target.dataset.uid].quantity + 1),
				},
			});
		} else {
			setCart({
				...cartItems,
				[e.target.dataset.uid]: {
					...cartItems[e.target.dataset.uid],
					quantity: Math.round(cartItems[e.target.dataset.uid].quantity - 1),
				},
			});
		}
		console.log(e.target.dataset.uid, e.target.id);
	};

	const initialOptions = {
		'client-id':
			'AQyYzU7BXt7djBpuJw3Upu7FUGkfQyxdcBY8GxfHfbdrLeSKdzl6ngHXwBforh9gCVLJulXMQDZWTy6r',
		currency: 'USD',
	};

	const setCartArray = () => {
		const itemsArray = [];
		Object.keys(cartItems).forEach((key) => {
			let price = parseInt(cartItems[key].price).toFixed(2).toString();
			itemsArray.push({
				name: cartItems[key].displayName,
				quantity: cartItems[key].quantity.toString(),
				unit_amount: {
					currency_code: 'USD',
					value: price,
				},
			});
		});
		return itemsArray;
	};

	// creates a paypal order
	const createOrder = (data, actions) => {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: {
							value: total.toFixed(2).toString(),
							breakdown: {
								item_total: {
									currency_code: 'USD',
									value: total.toFixed(2).toString(),
								},
							},
						},
						items: setCartArray(),
					},
				],
			})
	};

	const onApprove = (data, actions) => {
		return actions.order.capture().then(function (details) {
			const { payer } = details;
			alert(`Thank you for the buying with us ${payer}`)
		});
	};

	return (
		<main className="cart-container">
			<h1>Your cart</h1>
			<div className="flex">
				<p>
					{itemsCount > 1 || itemsCount === 0
						? `total: (${itemsCount} items)`
						: `total: (${itemsCount} item)`}
				</p>
				<p>{`$${total.toFixed(2)}`}</p>
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
							key={cartItems[key].keyId}
							uid={cartItems[key].keyId}
							handleClick={handleClick}
							handleDelete={deleteItem}
						/>
					);
				})}
			</div>
			{itemsCount > 0 ? (
				<div className="paypal-container">
					<PayPalScriptProvider options={initialOptions}>
						<PayPalButtons
							style={{ layout: 'horizontal' }}
							createOrder={createOrder}
							onApprove={onApprove}
						/>
					</PayPalScriptProvider>
				</div>
			) : null}
			<Link className="cart-btn" to="/products">
				continue shopping
			</Link>
		</main>
	);
};

export default Cart;
