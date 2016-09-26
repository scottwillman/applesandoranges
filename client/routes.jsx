import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute, IndexRedirect } from 'react-router';


import { RegisterLayout } from '/imports/layouts/public/register/RegisterLayout.jsx';
import { LoginLayout } from '/imports/layouts/public/login/LoginLayout.jsx';

import ChooseClassroomLayoutContainer from '/imports/layouts/authenticated/chooseClassroom/ChooseClassroomLayout.jsx';

import BaseLayoutContainer from '/imports/layouts/authenticated/base/BaseLayout.jsx';
import RosterLayoutContainer from '/imports/layouts/authenticated/roster/RosterLayout.jsx';

import { FormHarness } from '/imports/layouts/harness/forms_base.jsx';
import { EditableDataRow } from '/imports/layouts/harness/editableDataRow.jsx';

// import { AppBaseLayout } from '/imports/layouts/appBase/AppBaseLayout.jsx';

Meteor.startup(() => {

	render((
		<Router history={browserHistory}>
			<Route path="/register" component={RegisterLayout} />
			<Route path="/login" component={LoginLayout} />

			<Route path="/choose" component={ChooseClassroomLayoutContainer} />
			<Route path="/classroom/:classroomId" component={BaseLayoutContainer}>
				<IndexRedirect to="/classroom/:classroomId/roster" />
				<Route path="/classroom/:classroomId/roster" component={RosterLayoutContainer} />
			</Route>
			<Route path="harness/forms" component={FormHarness} />
			<Route path="harness/editableDataRow" component={EditableDataRow} />
		</Router>
	), document.getElementById('app'));
});
