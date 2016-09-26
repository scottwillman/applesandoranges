// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


Schema = {};

Schema.timestamp = function() {
	if (this.isInsert) {
		return new Date();
	} else if (this.isUpsert) {
		return {$setOnInsert: new Date()};
	} else {
		this.unset();  // Prevent user from supplying their own value
	}
};

Schema.active = new SimpleSchema({
	value: {
		type: Boolean,
		defaultValue: false
	},
	timestamp: {
		type: Date,
		autoValue: Schema.timestamp,
	},
});

Schema.address = new SimpleSchema({
	street: {
		type: String,
		optional: true
	},
	city: {
		type: String,
		optional: true
	},
	state: {
		type: String,
		optional: true,
		max: 2
	},
	zipCode: {
		type: String,
		optional: true
	}
});

Schema.UserProfile = new SimpleSchema({
	name: {
		type: String,
	},
	phoneNumber: {
		type: String,
		optional: true,
		// regEx:
	},
	active: {
		type: Schema.active,
	},
	lastLogin: {
		type: Date,
		optional: true
	},
	additionalInfo: {
		type: String,
		optional: true
	},
	children: {
		type: Array,
		minCount: 1
	},
	"children.$.child": {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	"children.$.relationship": {
		type: String,
		allowedValues: [
			'mother',
			'father',
			'grandmother',
			'grandfather',
			'sibling',
			'aunt',
			'uncle',
			'other',
		],
	},
	"children.$.classroom": {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	}
});

Schema.User = new SimpleSchema({
	username: {
		type: String,
		optional: true
	},
	emails: {
		type: Array,
		optional: true
	},
	"emails.$": {
		type: Object
	},
	"emails.$.address": {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	profile: {
		type: Schema.UserProfile
	},
	heartbeat: { // In order to avoid an 'Exception in setInterval callback' from Meteor
		type: Date,
		optional: true
	}
});
Meteor.users.attachSchema(Schema.User);


Children = new Mongo.Collection('children');
Schema.children = new SimpleSchema({
	name: {
		type: String
	},
	birthdate: {
		type: Date,
		optional: true
	},
	gender: {
		type: String,
		allowedValues: [
			'male',
			'female',
			'other'
		],
		optional: true
	},
	active: {
		type: Schema.active,
	}
});
Children.attachSchema(Schema.children);


Classrooms = new Mongo.Collection('classrooms');
Schema.classrooms = new SimpleSchema({
	name: {
		type: String,
	},
	school: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	roomParents: {
		type: [String],
		regEx: SimpleSchema.RegEx.Id
	},
	children: {
		type: [String],
		regEx: SimpleSchema.RegEx.Id,
		defaultValue: []
	},
	active: {
		type: Schema.active
	}
});
Classrooms.attachSchema(Schema.classrooms);


Schools = new Mongo.Collection('schools');
Schema.schools = new SimpleSchema({
	name: {
		type: String
	},
	phoneNumber: {
		type: String,
		optional: true,
	},
	email: {
		type: String,
		optional: true,
		regEx: SimpleSchema.RegEx.Email
	},
	address: {
		type: Schema.address,
		optional: true
	}
});
Schools.attachSchema(Schema.schools);


ActivityLog = new Mongo.Collection('activityLog');
Schema.activityLogDestination = new SimpleSchema({
	objectType: {
		type: String,
		allowedValues: [
			'none',
			'user',
			'classroom',
			'school',
			'child',
		]
	},
	objectId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	}
});
Schema.activityLog = new SimpleSchema({
	sender: {
		type: Schema.activityLogDestination
	},
	receiver: {
		type: Schema.activityLogDestination
	},
	timestamp: {
		type: Date,
		autoValue: Schema.timestamp
	}
});
ActivityLog.attachSchema(Schema.activityLog);
