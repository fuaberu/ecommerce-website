import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage/Homepage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
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
			authListner()
		}
	});

	return (
		<div className="App">
			<Header currentUser={currentUser} />
			<div className="main">
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/sign-in">
						{currentUser ? <Redirect to="/" /> : <SignIn />}
					</Route>
					<Route path="/sign-up">
						{currentUser ? <Redirect to="/" /> : <SignUp />}
					</Route>
				</Switch>
			</div>
			<Footer />
		</div>
	);
}

export default App;
