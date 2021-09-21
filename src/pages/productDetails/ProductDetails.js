import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../../firebase/firebaseUtility';
import './productDetails.scss';

const ProductDetails = () => {
	const [state, setState] = useState([]);
	const { productID } = useParams();

	const fetchData = async (uid) => {
		const userRef = db.doc(`products/${uid}`);
		const snapshot = await userRef.get();
		const data = snapshot.data();
		setState(data);
	};
	useEffect(() => {
		fetchData(productID);
	}, []);
	return (
		<main className="product-detail-container">
			<h1>{state.displayName}</h1>
			<img src={state.image} alt={state.alt} />
			<div className="flex">
				<p>{`$${state.price}`}</p>
				<button>
					add to cart <i className="fas fa-cart-plus"></i>
				</button>
			</div>
			<h3>{state.descriptionHeadLine}</h3>
			<p>{state.description}</p>
		</main>
	);
};

export default ProductDetails;
