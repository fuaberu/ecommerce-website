import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './layouts/Layout';
import Homepage from './pages/Homepage/Homepage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Products from './pages/Products/Products';
import ProductDetails from './pages/productDetails/ProductDetails';
import NoMatch from './pages/404/NoMatch';
import { auth, handleUserProfile } from './firebase/firebaseUtility';
import './default.scss';
import Cart from './pages/cart/Cart';

export const userInfo = React.createContext();
export const myCart = React.createContext();

function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [cart, setCart] = useState({});
	const [totalItems, setTotalItems] = useState(0);

	const itemsQuantity = () => {
		setTotalItems(0);
		Object.keys(cart).forEach((key) => {
			setTotalItems((prev) => prev + cart[key].quantity);
		});
	};
	useEffect(() => {
		itemsQuantity();
	}, [cart]);

	useEffect(() => {
		const authListner = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot((snap) => {
					setCurrentUser({
						id: snap.id,
						...snap.data(),
					});
				});
			}
			setCurrentUser(userAuth);
		});
		return () => {
			authListner();
		};
	}, []);

	return (
		<userInfo.Provider value={currentUser}>
			<myCart.Provider
				value={{ set: setCart, value: cart, totalItems: totalItems }}
			>
					<div className="App">
						<div className="main">
							<Switch>
								<Route
									exact
									path="/"
									render={() => (
										<Layout>
											<Homepage />
										</Layout>
									)}
								/>
								<Route
									path="/sign-in"
									render={() =>
										currentUser ? (
											<Redirect to="/" />
										) : (
											<Layout>
												<SignIn />
											</Layout>
										)
									}
								/>
								<Route
									path="/sign-up"
									render={() =>
										currentUser ? (
											<Redirect to="/" />
										) : (
											<Layout>
												<SignUp />
											</Layout>
										)
									}
								/>
								<Route
									exact
									path="/products"
									render={() => (
										<Layout>
											<Products />
										</Layout>
									)}
								/>
								<Route
									exact
									path="/products/:filterGender"
									render={() => (
										<Layout>
											<Products />
										</Layout>
									)}
								/>
								<Route
									exact
									path="/products/:filterGender/:filterType"
									render={() => (
										<Layout>
											<Products />
										</Layout>
									)}
								/>
								<Route
									exact
									path="/product/:productID"
									render={() => (
										<Layout>
											<ProductDetails />
										</Layout>
									)}
								/>
								<Route
									exact
									path="/cart"
									render={() => (
										<Layout>
											<Cart />
										</Layout>
									)}
								/>
								<Route
									exact
									path="*"
									render={() => (
										<Layout>
											<NoMatch />
										</Layout>
									)}
								/>
							</Switch>
						</div>
					</div>
			</myCart.Provider>
		</userInfo.Provider>
	);
}

export default App;
