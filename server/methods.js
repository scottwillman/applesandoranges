import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';

import { UserMethods } from '/imports/methods/users.js';
import { ChildrenMethods } from '/imports/methods/children.js';
import { SchoolMethods } from '/imports/methods/schools.js';
import { ClassroomMethods } from '/imports/methods/classroom.js';


Meteor.methods({
	'roomparent.register': function(data) {
		const userMethods      = new UserMethods();
		const childrenMethods  = new ChildrenMethods();
		const schoolMethods    = new SchoolMethods();
		const classroomMethods = new ClassroomMethods();


		// PARENT
		// conform the data keys to the method requirements
		const userExists = userMethods.existsByEmail(data.parentEmail);
		if (userExists) throw new Meteor.Error("parentEmail", "Email address exists");

		const userResult = userMethods.register(data.parentEmail, data.parentPassword);
		if (userResult.error) throw new Meteor.Error("form", userResult.error);
		const user_id = userResult.resp;


		// CHILD
		const childData = {
			'name': data.childName,
		};
		const childResult = childrenMethods.create(childData);
		if (childResult.error) throw new Meteor.Error("childName", childResult.error);
		const child_id = childResult.resp;


		// SCHOOL
		const parts = data.schoolCityState.split(',');
		const schoolData = {
			'name': data.schoolName,
			'address': {
				'city':parts[0],
				'state':parts[1],
			}
		};
		let school_id = schoolMethods.findOneId(schoolData);
		if (!school_id) {
			let schoolResult = schoolMethods.create(schoolData);
			if (schoolResult.error) throw new Meteor.Error("form", schoolResult.error);
			school_id = schoolResult.resp;
		}


		// CLASSROOM
		const classroomData = {
			'name': data.classroomName,
			'school': school_id,
			'roomParents':[user_id],
			'children':[child_id],
		};
		const classroomExists = classroomMethods.exists(classroomData);
		if (classroomExists) throw new Meteor.Error("classroomName", "Classroom already exists");
		const classroomResult = classroomMethods.create(classroomData);
		if (classroomResult.error) throw new Meteor.Error("form", classroomResult.error);
		const classroom_id = classroomResult.resp;


		// UPDATE USER PROFILE
		const profileData = {
			'name': data.parentName,
		};
		const profileResult = userMethods.updateProfile(user_id, profileData);
		if (profileResult.error) throw new Meteor.Error("form", profileResult.error);

		const userChildData = {
			'child': child_id,
			'classroom': classroom_id,
		};
		const userChildResult = userMethods.addChild(user_id, userChildData);
		if (userChildResult.error) throw new Meteor.Error("form", userChildResult.error);
	},
});
