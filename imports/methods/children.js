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
}


// export const ChildrenMethods = {};
//
// ChildrenMethods._sanitizers = {
// 	'name': ['trim'],
// 	'birthdate': ['date'],
// 	'gender': ['trim'],
// };
// ChildrenMethods._sanitize = function(data) {
// 	let cleanData = {};
// 	for (var d in data) cleanData[d] = sanitize(data[d], ChildrenMethods._sanitizers[d]);
// 	return cleanData;
// }
//
// ChildrenMethods.exists = function(data) {
// 	const result = Children.find(data, {'limit':1}).count();
// 	return result;
// };
//
// ChildrenMethods.create = function(data) {
// 	let result = {
// 		resp: '',
// 		error: '',
// 	}
//
// 	// Validate And Sanitize
// 	if (cleanData.hasOwnProperty('gender')) {
// 		if (Genders.indexOf(cleanData.gender) === -1) {
// 			result.error = cleanData.gender+' is not an allowed gender value.';
// 			return result;
// 		}
// 	}
//
// 	try {
// 		const cleanData = ChildrenMethods._sanitize(data);
// 	} catch(err) {
// 		result.error = err;
// 		return result;
// 	}
//
// 	// Perform DB actions
// 	try {
// 		cleanData.active = {
// 			'value': true,
// 			'timestamp': new Date(),
// 		}
// 		result.resp = Children.insert(cleanData);
//
// 	} catch(err) {
// 		result.error = err;
// 		return result;
// 	}
// 	return result;
// };
