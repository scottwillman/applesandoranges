import React from 'react';

import './LoginLayout.scss';

import { LoginForm } from './containers/LoginForm.jsx';

const LoginLayout = (props) => (
	<div id="login-layout">
		<div className="header">
			<img src="/images/aao_logo_orange.png" />
			<h3>Sign In</h3>
		</div>
		<LoginForm />
	</div>
);

export { LoginLayout };
