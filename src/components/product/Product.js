import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { myCart } from '../../App';
import './product.scss';

const ProductContainer = (props) => {
	const { image, alt, displayName, price, uid } = props;

	const setCart = useContext(myCart).set;
	const cart = useContext(myCart).value;

	const handleAddToCart = () => {
		const objKeys = Object.keys(cart);
		if (objKeys.some((element) => element === uid)) {
			setCart({
				...cart,
				[uid]: {
					displayName: displayName,
					alt: alt,
					image: image,
					price: price,
					quantity: cart[uid].quantity + 1,
					keyId: uid,
				},
			});
		} else {
			setCart({
				...cart,
				[uid]: {
					displayName: displayName,
					alt: alt,
					image: image,
					price: price,
					quantity: 1,
					keyId: uid,
				},
			});
		}
	};
	return (
		<div className="product-wrapper">
			<Link className="image-link" to={`/product/${uid}`}>
				<img className="product-image" src={image} alt={alt} />
			</Link>
			<Link className="name-link" to={`/product/${uid}`}>
				<h4 data-uid={uid}>{displayName}</h4>
			</Link>
			<p>{`$${price}`}</p>
			<button onClick={() => handleAddToCart()}>
				<i className="fas fa-cart-plus"></i>
			</button>
		</div>
	);
};

export default ProductContainer;
