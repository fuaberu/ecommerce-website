import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './Layout';
import Homepage from './pages/Homepage/Homepage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Products from './pages/Products/Products';
import { auth, handleUserProfile } from './firebase/firebaseUtility';
import './default.scss';

function App() {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const authListner = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot((snap) => {
					setCurrentUser({
						id: snap.id,
						...snap,
					});
				});
			}
			setCurrentUser(userAuth);
		});
		return () => {
			authListner();
		};
	});

	return (
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
						path="/products"
						render={() => (
							<Layout>
								<Products />
							</Layout>
						)}
					/>
				</Switch>
			</div>
		</div>
	);
}

export default App;
