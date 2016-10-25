import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';

import { UserMethods } from '/imports/methods/users.js';
import { ChildrenMethods } from '/imports/methods/children.js';
import { SchoolMethods } from '/imports/methods/schools.js';
import { ClassroomMethods } from '/imports/methods/classroom.js';


Meteor.methods({
	'child.update': function(data) {
		const childrenMethods = new ChildrenMethods();

		const result = childrenMethods.update(data._id, data.data);
		if (result.error) throw new Meteor.Error("form", result.error);
		return true;
	},
	'user.update': function(data) {
		const userMethods = new UserMethods();

		const result = userMethods.update(data._id, data.data);
		if (result.error) throw new Meteor.Error("form", result.error);
		return true;
	}
});
