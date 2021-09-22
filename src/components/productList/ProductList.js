import React from 'react';
import { SignInBtn } from '../small components/SmallComponents';
import './productList.scss';

const ProductList = (props) => {
	const { image, alt, displayName, price, quantity } = props;
	return (
		<div className="list-item">
			<img className="product-image" src={image} alt={alt} />
			<div>
				<div className="flex">
					<h4>{displayName}</h4>
					<SignInBtn icon="fas fa-trash" />
				</div>
				<div className="flex">
					<p>{`Qty: ${quantity}`}</p>
					<p>{`$${price}`}</p>
				</div>
            </div>
		</div>
	);
};

export default ProductList;
