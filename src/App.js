import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage/Homepage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import './default.scss';

function App() {
	return (
		<div className="App">
			<Header />
			<div className="main">
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/sign-in" component={SignIn} />
					<Route path="/sign-up" component={SignUp} />
				</Switch>
			</div>
			<Footer />
		</div>
	);
}

export default App;
