import { Meteor } from 'meteor/meteor';


Meteor.publish('classrooms.full.byUserId', (userId) => {
	const user = Meteor.users.findOne(userId);
	let classroom_ids = user.profile.children.map((child) => { return child.classroom });
	return Classrooms.find({"_id": {"$in": classroom_ids}});
});

Meteor.publish('users.profile.byClassroom', (classroomId) => {
	return Meteor.users.find({'profile.children.classroom': classroomId}, {'fields':{'profile':1}});
});

Meteor.publish('children.full.byIds', (child_ids) => {
	return Children.find({'_id': {'$in': child_ids}});
});

Meteor.publish('children.full.byClassroomId', (classroomId) => {
	const classroom = Classrooms.find(classroomId, {'limit':1, 'fields':{'children':1}});
	return Children.find({'_id': {'$in': classroom.children}});
});

Meteor.publish('classroom.base.byId', (classroomId) => {
	// Need to secure by logged in user actually in that classroom
	return Classrooms.find({'_id':classroomId}, {'limit':1, 'fields':{'name':1}});
});

Meteor.publish('classroom.full.byId', (classroomId) => {
	// Need to secure by logged in user actually in that classroom
	return Classrooms.find({'_id':classroomId}, {'limit':1});
});

Meteor.publish('children.full.byParent', (userId) => {
	const user = Meteor.users.findOne({'_id':userId}, {'fields':{'profile.children':1}});
	let children_ids = user.profile.children.map((child) => { return child.child });
	return Children.find({'_id': {"$in": children_ids}});
});

Meteor.publish('childrenParents.fullProfile.byClassroomId', (classroomId) => {
	const classroom    = Classrooms.findOne(classroomId, {'limit':1, 'fields':{'children':1}});
	const c = Children.find({'_id': {'$in': classroom.children}}, {'fields':{'_id':1}}).fetch();
	const children_ids = c.map((child) => { return child._id });
	return [
		Children.find({'_id': {'$in': classroom.children}}),
		Meteor.users.find({'profile.children.child': {'$in': children_ids}}, {'fields':{'profile':1, 'emails':1}}),
	]
});
