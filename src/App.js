import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';

// Routes
import { ROUTES } from './url';

// Authentication
import Authentication from './authentication/Main/Authentication.component';
import { withAuthentication } from './authentication/Session';

function App(props) {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route exact path={ROUTES.HOMEPAGE} component={HomePage} />
				<Authentication />
			</Switch>
		</Router>
	);
}
export default withAuthentication(App);
