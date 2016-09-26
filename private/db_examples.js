// Get classrooms for current user
const userClassrooms_ids = user.userProfile.children.map((child) => {
	return child.classroom;
});
const userClassrooms = Classrooms.find({'_id': {'$in': userClassrooms_ids}});

// Get children for current user
const userChildren_ids = user.userProfile.children.map((child) => {
	return child.child;
});
const userChildren = Children.find({'_id': {'$in': userChildren_ids}});

// Get parents of children in classroom
const parents = Meteor.users.find({'children.classroom': classroom._id});

// Get children of classroom
const children = Children.find({'_id': {'$in': classroom.children}});

// Is user room parent of classroom
const isRoomParent = (classroom.roomParents.indexOf(user._id) > -1) ? true : false;

// Get schools from user
const userClassrooms_ids = user.userProfile.children.map((child) => {
	return child.classroom;
});
const userClassrooms = Classrooms.find({'_id': {'$in': userClassrooms_ids}});
const school_ids = userClassrooms.map((classroom) => {
	return classroom.school;
});
const schools = Schools.find({'_id': {'$in': school_ids}});

// Change child's classroom
Classrooms.update(
	{'_id': old_classroom_id},
	{'$pull': {'children': child_id}}
);
Classrooms.update(
	{'_id': new_classroom_id},
	{'$addToSet': {'children': child_id}}
);
Meteor.users.update(
	{'children.child': child_id},
	{'$set': {
		'children.$.classroom': new_classroom_id
	}}, {'multi': true}
);

// Remove child from user (why?)
Classrooms.update(
	{'_id':classroom_id},
	{'$pull': {'children': child_id}}
);
Meteor.users.update(
	{'children.child': child_id},
	{'$pull': {
		'children': {
			'child': child_id
	}}}, {'multi': true}
);
