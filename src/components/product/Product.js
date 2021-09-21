import React from 'react';
import { Link } from 'react-router-dom';
import './product.scss';

const ProductContainer = ({
	image,
	alt,
	displayName,
	price,
	uid,
}) => {
	return (
		<div className="product-wrapper">
			<Link className='image-link' to={`/product/${uid}`}>
				<img className='product-image' src={image} alt={alt} />
			</Link>
			<Link className='name-link' to={`/product/${uid}`}>
				<h4 data-uid={uid}>{displayName}</h4>
			</Link>
			<p>{`$${price}`}</p>
			<button>
				<i className="fas fa-cart-plus"></i>
			</button>
		</div>
	);
};

export default ProductContainer;
