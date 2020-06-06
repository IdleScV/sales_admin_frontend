import React, { useState, useEffect } from 'react';

// Components
import { Link } from 'react-router-dom';
import { withAuthentication } from '../../authentication/Session';

import Profile from '../Profile';
import Upload from '../Upload';
import SalesReport from '../SalesReport';

// Routes
import * as AUTHROUTES from '../../authentication/Routes';
import { URL } from '../../url';

// Style
import { Button } from '@material-ui/core';
import './index.css';

function HomePage(props) {
	const [ salesData, salesDataSet ] = useState(undefined);

	// User's pre-existing sales data is retrieved from the database on component mount
	useEffect(
		() => {
			if (props.firebase.auth.W) {
				fetch(URL + 'users/' + props.firebase.auth.W)
					.then((response) => response.json())
					.then((userData) => salesDataSet(userData.sales));
			}
		},
		[ props.firebase.auth.W ]
	);

	return (
		<div id="home">
			{props.firebase.auth.W ? (
				<div className="page">
					<div className="left">
						<SalesReport salesData={salesData} salesDataSet={salesDataSet} firebaseId={props.firebase.auth.W} />
					</div>
					<div className="right">
						<Upload salesDataSet={salesDataSet} salesData={salesData} firebaseId={props.firebase.auth.W} />
						<Profile firebase={props.firebase} />
					</div>
				</div>
			) : (
				<div className="null">
					<h2>sales_admin</h2>
					<br />
					Please sign in
					<Button variant="contained" color="primary">
						<Link to={AUTHROUTES.SIGN_IN}>Here</Link>
					</Button>
					or sign up
					<Button variant="contained" color="primary">
						<Link to={AUTHROUTES.SIGN_UP}>Here</Link>
					</Button>
				</div>
			)}
		</div>
	);
}

export default withAuthentication(HomePage);
