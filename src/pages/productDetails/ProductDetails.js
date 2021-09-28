import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { myCart } from '../../App';
import { db } from '../../firebase/firebaseUtility';
import Spinner from '../../components/small components/Spinner';
import './productDetails.scss';

const ProductDetails = () => {
	const [showContent, setShowContent] = useState(false);
	const [state, setState] = useState([]);
	const { productID } = useParams();

	const setCart = useContext(myCart).set;
	const cart = useContext(myCart).value;

	const handleAddToCart = (uidKey) => {
		const objKeys = Object.keys(cart);
		if (objKeys.some((element) => element === uidKey)) {
			setCart({
				...cart,
				[uidKey]: {
					displayName: cart[uidKey].displayName,
					alt: cart[uidKey].alt,
					image: cart[uidKey].image,
					price: cart[uidKey].price,
					quantity: cart[uidKey].quantity + 1,
					keyId: cart[uidKey].uid,
				},
			});
		} else {
			setCart({
				...cart,
				[uidKey]: {
					displayName: state.displayName,
					alt: state.alt,
					image: state.image,
					price: state.price,
					quantity: 1,
					keyId: state.uid,
				},
			});
		}
	};

	const fetchData = async (uid) => {
		setShowContent(false)
		const userRef = db.doc(`products/${uid}`);
		const snapshot = await userRef.get();
		const data = snapshot.data();
		data.uid = uid;
		setState(data);
		setShowContent(true)
	};
	useEffect(() => {
		fetchData(productID);
	}, [productID]);

	return (
		<main className="product-detail-container">
			{!showContent && <Spinner />}
			{showContent && (
				<div className="product-grid">
					<h1>{state.displayName}</h1>
					<img src={state.image} alt={state.alt} />
					<div>
						<div className="flex">
							<p>{`$${state.price}`}</p>
							<button onClick={() => handleAddToCart(productID)}>
								<Link to="/cart">
									add to cart <i className="fas fa-cart-plus"></i>
								</Link>
							</button>
						</div>
						<h3>{state.descriptionHeadLine}</h3>
						<p>{state.description}</p>
					</div>
				</div>
			)}
		</main>
	);
};

export default ProductDetails;
