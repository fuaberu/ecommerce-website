import React from 'react';
import { SignInBtn } from '../small components/SmallComponents';
import './productList.scss';

const ProductList = (props) => {
	const {
		image,
		alt,
		displayName,
		price,
		quantity,
		handleClick,
		uid,
		handleDelete,
	} = props;
	return (
		<div className="list-item">
			<img className="product-image" src={image} alt={alt} />
			<div>
				<div className="flex">
					<h4>{displayName}</h4>
					<button onClick={(e) => handleDelete(e.target.dataset.uid)}>
						<i id="delete" data-uid={uid} className="fas fa-trash"></i>
					</button>
				</div>
				<div className="flex">
					<div className="quantity-container">
						<button onClick={(e) => handleClick(e)}>
							<i id="-" data-uid={uid} className="fas fa-minus"></i>
						</button>
						<p>{`${quantity}`}</p>
						<button onClick={(e) => handleClick(e)}>
							<i id="+" data-uid={uid} className="fas fa-plus"></i>
						</button>
					</div>
					<p>{`$${price}`}</p>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
