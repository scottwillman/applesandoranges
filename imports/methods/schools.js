import { Meteor } from 'meteor/meteor';
import { BaseMethods } from '/imports/lib/BaseMethods.js';


export class SchoolMethods extends BaseMethods {
	constructor() {
		super();

		this._collection = Schools;
		this.schema = {
			'name':  ['trim'],
			'phone': ['trim'],
			'email': ['email'],
			'address': {
				'street': ['trim'],
				'city':   ['trim'],
				'state':  ['trim'],
				'zip':    ['trim'],
			},
		};
	}

	exists(data) {
		const cleanData = this._sanitize(data);
		return this._collection.find(cleanData, {'limit':1}).count() ? true : false;
	}

	findOneId(data) {
		const cleanData = this._sanitize(data);
		const result = this._collection.find(cleanData, {'limit':1, 'fields':{'_id':1}}).fetch();
		return (result) ? result._id : false;
	}

	create(data) {
		let result = {
			resp: '',
			error: '',
		}

		// Validate And Sanitize
		let cleanData = null;
		try {
			cleanData = this._sanitize(data);
		} catch(err) {
			result.error = err;
			return result;
		}

		// Perform DB actions
		try {
			result.resp = this._collection.insert(cleanData);
			this.__logUserActivity({
				'id': result.resp,
				'action': "School created: "+cleanData.name,
			});
		} catch(err) {
			result.error = err;
			return result;
		}
		return result;
	}
}
