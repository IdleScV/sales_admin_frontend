import React, { useState, useEffect } from 'react';

function Profile({ firebase }) {
	const [ userData, userDataSet ] = useState(undefined);

	useEffect(
		() => {
			const findUser = () => {
				firebase.user(firebase.auth.W).once('value', (snapshot) => {
					userDataSet(snapshot.val());
				});
			};
			findUser();
		},
		[ firebase ]
	);

	if (userData) {
		return (
			<div id="profile">
				<h2>Profile</h2>
				<div>Email: {userData.email}</div>
				<div>Username: {userData.username}</div>
			</div>
		);
	} else {
		return <div>Loading...</div>;
	}
}

export default Profile;
