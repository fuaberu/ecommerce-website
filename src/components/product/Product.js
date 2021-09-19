import React from 'react';
import './product.scss';

const ProductContainer = ({ image, alt, displayName, price }) => {
	return (
		<div className="product-wrapper">
			<img src={image} alt={alt} />
			<h4>{displayName}</h4>
			<p>{`$${price}`}</p>
			<button>
				<i className="fas fa-cart-plus"></i>
			</button>
		</div>
	);
};

export default ProductContainer;
