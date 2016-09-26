import React from 'react';

import './HomeLayout.scss';
import '/imports/stylesheets/simpleGrid.scss';

// import { PasscodeForm } from './containers/PasscodeForm.jsx';
import { RegisterForm } from './containers/RegisterForm.jsx';

const HomeLayout = (props) => (
	<div className="grid">
		<div className="col-2-3" id="home">
			<h2>Let Us Help You Manage Your Room Parent Duties While Giving Back to Your School</h2>
			<h3>Over $10,000 donated back to 20 schools (and growing!).</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>
		<div className="col-1-3" id="registerRoomParent">
			<h3>Manage Your Classroom</h3>
			<RegisterForm />
		</div>
	</div>
);

export { HomeLayout };
