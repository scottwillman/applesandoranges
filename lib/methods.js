import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';

import { UserMethods } from '/imports/methods/users.js';
import { ChildrenMethods } from '/imports/methods/children.js';
import { SchoolMethods } from '/imports/methods/schools.js';
import { ClassroomMethods } from '/imports/methods/classroom.js';


Meteor.methods({
	'child.update': function(data) {
		const childrenMethods = new ChildrenMethods();

		// childrenMethods.update(data.)
	},
	'user.update': function(data) {
		const userMethods = new UserMethods();

		const userResult = userMethods.update(data._id, data.data);
		if (userResult.error) throw new Meteor.Error("form", userResult.error);
		return true;
	}
});
