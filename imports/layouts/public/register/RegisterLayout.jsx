import React from 'react';

import './RegisterLayout.scss';

// import { PasscodeForm } from './containers/PasscodeForm.jsx';
import { RegisterForm } from './containers/RegisterForm.jsx';

const RegisterLayout = (props) => (
	<div id="register-layout">
		<div className="header">
			<img src="/images/aao_logo_orange.png" />
			<h3>Sign up, room parent!</h3>
		</div>
		<RegisterForm />
	</div>
);

export { RegisterLayout };
