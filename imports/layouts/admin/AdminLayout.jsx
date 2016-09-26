import React from 'react';

import './AdminLayout.scss';

import VerticalNavigation from '/imports/containers/VerticalNavigation.jsx';

const AdminLayout = (props) => (
	<div id="adminLayout" className="grid">
		<div id="adminLayoutLeft" className="col-1-5">
			<VerticalNavigation />
		</div>
		<div id="adminLayoutRight" className="col-4-5">
			{props.children}
		</div>
	</div>
);

export { AdminLayout };
