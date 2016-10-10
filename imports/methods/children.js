import { Meteor } from 'meteor/meteor';
import { BaseMethods } from '/imports/lib/BaseMethods.js';
import { Genders } from '/imports/lib/choices.js';


export class ChildrenMethods extends BaseMethods {
	constructor() {
		super();

		this._collection = Children;
		this.schema = {
			'name': ['trim'],
			'birthdate': ['date'],
			'gender': ['trim'],
		};
	}

	exists(data) {
		return this._collection.find(data, {'limit':1}).count() ? true : false;
	}

	create(data) {
		let result = {
			resp: '',
			error: '',
		}

		// Validate And Sanitize
		if (data.hasOwnProperty('gender')) {
			if (Genders.indexOf(data.gender) === -1) {
				result.error = data.gender+' is not an allowed gender value.';
				return result;
			}
		}

		let cleanData = null;
		try {
			cleanData = this._sanitize(data);
		} catch(err) {
			result.error = err;
			return result;
		}

		// Perform DB actions
		try {
			cleanData.active = {
				'value': true,
				'timestamp': new Date(),
			}
			result.resp = this._collection.insert(cleanData);
			this.__logUserActivity({
				'id': result.resp,
				'action': "Child created: "+cleanData.name,
			});

		} catch(err) {
			result.error = err;
			return result;
		}
		return result;
	}

	update(matchCriteria, newData) {
		let result = {
			resp: '',
			error: '',
		}

		// Validate And Sanitize
		if (newData.hasOwnProperty('gender')) {
			if (Genders.indexOf(newData.gender) === -1) {
				result.error = newData.gender+' is not an allowed gender value.';
				return result;
			}
		}

		let cleanData = null;
		try {
			cleanData = this._sanitize(newData);
		} catch(err) {
			result.error = err;
			return result;
		}

		// Perform DB actions
		try {
			// cleanData.active = {
			// 	'value': true,
			// 	'timestamp': new Date(),
			// }
			result.resp = this._collection.update(matchCriteria, {'$set': cleanData});
			this.__logUserActivity({
				'id': result.resp,
				'action': "Child updated: "+JSON.stringify(cleanData),
			});

		} catch(err) {
			result.error = err;
			return result;
		}
		return result;
	}
}
