import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { BaseMethods } from '/imports/lib/BaseMethods.js';


export class UserMethods extends BaseMethods {

	constructor() {
		super();

		this._collection = Meteor.users;
		this.schema = {
			'email':    ['email'],
			'password': ['trim'],
			'profile': {
				'name': ['trim'],
				'phone': ['trim'],
				'children': [
					{
						'child': [],
						'relationship': ['trim'],
						'classroom': [],
					}
				],
				'lastLogin': ['date'],
			}
		};
	}

	existsByEmail(email) {
		const cleanData = this._sanitize({'email': email});
		return this._collection.find({'emails.address': cleanData.email}, {'limit':1}).count();
	}

	register(email, password) {
		let result = {
			resp: '',
			error: '',
		};

		// Validate And Sanitize
		let cleanData = null;
		try {
			cleanData = this._sanitize({'email':email, 'password':password});
		} catch(err) {
			result.error = err.reason;
			return result;
		}

		// Perform DB actions
		try {
			result.resp = Accounts.createUser(cleanData);
			this.__logUserActivity({
				'id': result.resp,
				'action': "User registered with email: "+email,
			});
		} catch(err) {
			result.error = err.reason;
			return result;
		}
		return result;
	}

	updateProfile(user_id, data) {
		let result = {
			resp: '',
			error: '',
		};

		// Sanitize And Flatten
		let cleanData = null;
		try {
			cleanData = this._sanitize(data, this.schema.profile);
			flatData  = this._flattenObject({'profile': cleanData});

		} catch(err) {
			result.error = err.reason;
			return result;
		}

		// Perform DB actions
		try {
			result.resp = this._collection.update(user_id, {'$set': flatData});
			this.__logUserActivity({
				'id': user_id,
				'action': "Profile udpated for user: "+user_id,
			});
		} catch(err) {
			result.error = err.reason;
			return result;
		}
		return result;
	}

	addChild(user_id, data) {
		let result = {
			resp: '',
			error: '',
		};

		// Sanitize
		let cleanData = null;
		try {
			cleanData = this._sanitize(data, this.schema.profile.children[0]);
		} catch(err) {
			console.log(err);
			result.error = err.reason;
			return result;
		}

		// Perform DB actions
		try {
			result.resp = this._collection.update(user_id, {'$push': {'profile.children': cleanData}});
			this.__logUserActivity({
				'sender': user_id,
				'id': result.resp,
				'action': "Child added to user: "+cleanData.child,
			});
		} catch(err) {
			console.log(err);
			result.error = err.reason;
			return result;
		}
		return result;
	}

}
